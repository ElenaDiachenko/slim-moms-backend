const { Schema, model } = require('mongoose');
const Joi = require('joi').extend(require('@joi/date'));

const diarySchema = Schema({
  date: {
    type: Date,
    required: [true, 'Date is a required field'],
  },
  product: {
    type: String,
    required: [true, 'Product is a required field'],
  },
  weight: {
    type: Number,
    required: [true, 'Weight is a required field'],
  },
  baseCaloricity: {
    type: Number,
    required: [true, 'Calories is a required field'],
  },
  calories: {
    type: Number,
    default: null,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const joiSchema = Joi.object({
 date: Joi.date().format('YYYY.MM.DDZ').required(),
  product: Joi.string().required(),
  weight: Joi.number().required(),
  baseCaloricity: Joi.number().required(),
  calories: Joi.number(),
});

const DailyProduct = model('dailyProduct', diarySchema);

module.exports = { DailyProduct, joiSchema };
