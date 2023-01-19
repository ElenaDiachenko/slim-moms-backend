const { User, Session } = require('../../models');
const { RequestError, createToken } = require('../../helpers');
const jwt = require('jsonwebtoken');

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw RequestError(401, 'Unauthorized');
  }
  const { id, sid } = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
  let user = await User.findById(id);
  const session = await Session.findById(sid);

  if (!user || !session) {
    throw RequestError(401, 'Unauthorized');
  }
  console.log(session)
  await Session.findByIdAndDelete(sid);

  const newSession = await Session.create({
    uid: user._id,
  });
  const payload = {
    id: user._id,
    sid: newSession._id,
  };

  const { token: newToken, refreshToken: newRefreshToken } =
    createToken(payload);
  user = await User.findByIdAndUpdate(
    user._id,
    { token: newToken },
    { new: true }
  );

  res.cookie('refreshToken', newRefreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
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
    token: newToken,
    user: newUser,
  });
};

module.exports = refresh;
