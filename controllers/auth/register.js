const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const { RequestError } = require('../../helpers');
// const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, 'Email in use');
  }
  // const verificationToken = v4();

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const newUser = await User.create({
    password: hashPassword,
    email,
    name,
    // verificationToken,
  });
  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '3h' });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    status: 'success',
    code: 201,
    user: {
      name,
      email,
      // verificationToken: result.verificationToken,
    },
  });
};

module.exports = register;
