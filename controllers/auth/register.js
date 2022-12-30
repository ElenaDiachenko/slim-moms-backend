const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const { RequestError } = require('../../helpers');
const { v4 } = require('uuid');

const register = async (req, res) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, 'Email in use');
  }
  const verificationToken = v4();

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await User.create({
    password: hashPassword,
    email,
    name,
    verificationToken,
  });

  res.status(201).json({
    status: 'success',
    code: 201,
    user: {
      name: result.name,
      email: result.email,
      verificationToken: result.verificationToken,
    },
  });
};

module.exports = register;
