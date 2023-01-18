const Joi = require('joi');
const RequestError = require('../helpers/RequstError');

const userLoginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': '{{#label}} must be a valid email',
    }),

    password: Joi.string().min(6).required(),

    token: Joi.string(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    throw RequestError(400, validationResult.error.message);
  }

  next();
};

module.exports = userLoginValidation;
