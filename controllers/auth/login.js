const { User, Session } = require('../../models');
const { RequestError, createToken } = require('../../helpers');

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw RequestError(404, 'Email is wrong or verify or password is wrong');
  }

  const newSession = await Session.create({
    uid: user._id,
  });
  const payload = {
    id: user._id,
    sid: newSession._id,
  };
  const { token, refreshToken } = createToken(payload);

  await User.findByIdAndUpdate(user._id, { token });
  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.json({
    status: 'success',
    code: 200,
    token,
    user,
  });
};

module.exports = login;
