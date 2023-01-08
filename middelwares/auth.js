const { User, Session } = require('../models');
const { RequestError } = require('../helpers');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer = '', token = ''] = authorization.split(' ');

  try {
    if (bearer !== 'Bearer') {
      throw RequestError(401, 'Unauthorized');
    }

    const { id, sid } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    const session = await Session.findById(sid);

    if (!user || !user.token || !session) {
      throw RequestError(401, 'Unauthorized');
    }

    req.user = user;
    req.session = session;

    next();
  } catch (error) {
    if (error.message === 'jwt expired') {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
