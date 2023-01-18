const Joi = require('joi');
const { RequestError } = require('../helpers');

const userRegisterValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),

    email: Joi.string().email().required().messages({
      'string.email': '{{#label}} must be a valid email',
    }),

    password: Joi.string().min(6).required(),

    token: Joi.string(),
    bloodType: Joi.string().valid('1', '2', '3', '4'),
    height: Joi.number().min(100).max(250),
    age: Joi.number().min(18).max(100),
    curWeight: Joi.number(),
    desWeight: Joi.number(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    throw RequestError(400, validationResult.error.message);
  }

  next();
};

module.exports = userRegisterValidation;
