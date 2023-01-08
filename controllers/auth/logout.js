const { User, Session } = require('../../models');

const logout = async (req, res) => {
  await Session.findByIdAndDelete(req.session._id);

  await User.findByIdAndUpdate(
    { _id: req.user.id },
    { token: null },
    { new: true }
  );
  res.clearCookie('refreshToken');
  res.json({
    status: 'success',
  });
};

module.exports = logout;
