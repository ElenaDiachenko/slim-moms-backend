const jwt = require('jsonwebtoken');

const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const createToken = payload => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '60s' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: 30 * 24 * 60 * 60 * 1000,
  });

  return { token, refreshToken };
};

module.exports = createToken;
