const { User, Session } = require('../../models');
const { RequestError, createToken } = require('../../helpers');

const login = async (req, res) => {
  const { password, email } = req.body;
  let user = await User.findOne({ email });

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

  user = await User.findByIdAndUpdate(user._id, { token });
  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure:"true",
  });
  const newUser = {
    name: user.name,
    bloodType: user.bloodType,
    height: user.height,
    age: user.age,
    curWeight: user.curWeight,
    desWeight: user.desWeight,
    dailyCalorie: user.dailyCalorie,
    notRecProducts: user.notRecProducts,
  };
  res.json({
    status: 'success',
    code: 200,
    token,
    user: newUser,
  });
};

module.exports = login;
