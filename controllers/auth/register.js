const { User, Session } = require('../../models');
const bcrypt = require('bcryptjs');
const { RequestError, createToken, calculateDiet } = require('../../helpers');

// const { v4 } = require('uuid');

const register = async (req, res) => {
  const { name, password, email,...rest } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, 'Email in use');
  }
  // const verificationToken = v4();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  let data;
  if (Object.keys(rest).length) {
    data = await calculateDiet(rest)
  } else {
    data= {}
  }
  // const data = await calculateDiet(req.body);

  const newUser = await User.create({
    password: hashPassword,
    email,
    name,
    ...data,
    // verificationToken,
  });
  const newSession = await Session.create({
    uid: newUser._id,
  });
  
  const payload = {
    id: newUser._id,
    sid: newSession._id,
  };

  const { token, refreshToken } = createToken(payload);

  await User.findByIdAndUpdate(newUser._id, { token });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.status(201).json({
    status: 'success',
    code: 201,
    token,
    user: {
      name,
      email,
      ...data,
      // verificationToken: result.verificationToken,
    },
  });
};

module.exports = register;
