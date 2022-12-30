const { User, Session } = require('../../models');
const { RequestError } = require('../../helpers/RequstError');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refreshToken = async (req, res) => {
  console.log('RefreshToken');
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const activeSession = await Session.findById(req.body.sid);
    if (!activeSession) {
      throw RequestError('Not found');
    }

    const reqRefreshToken = authHeader.replace('Bearer', '');

    let payload = {};
    try {
      payload = jwt.verify(reqRefreshToken, REFRESH_SECRET_KEY);
    } catch (error) {
      await Session.findByIdAndDelete(req.body.sid);
      throw new RequestError('Unauthorized');
    }

    const user = await User.findById(payload.uid);
    const session = await Session.findById(payload.sid);
    if (!user) {
      throw new RequestError('Not found');
    }
    if (!session) {
      throw new RequestError('Not found');
    }

    await Session.findByIdAndDelete(payload.sid);
    const newSession = await Session.create({
      uid: user._id,
    });

    const newAccessToken = jwt.sign(
      { uid: user._id, sid: newSession._id },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    const newRefreshToken = jwt.sign(
      {
        uid: user._id,
        sid: newSession._id,
      },
      REFRESH_SECRET_KEY,
      { expiresIn: '30d' }
    );

    res.json({
      status: 'success',
      code: 200,
      data: {
        newSid: newSession._id,
        newAccessToken,
        newRefreshToken,
      },
    });
  }
  throw new RequestError('Bad Request');
};

module.exports = refreshToken;
