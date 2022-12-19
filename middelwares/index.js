const validation = require('./validation');
const ctrlWrapper = require('./ctrlWrapper');
const userRegisterValidation = require('./userRegisterValidation');
const userLoginValidation = require('./UserLoginValidation');
const auth = require('./auth');

module.exports = {
  validation,
  ctrlWrapper,
  userRegisterValidation,
  userLoginValidation,
  auth,
};
