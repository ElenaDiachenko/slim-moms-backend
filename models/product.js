const { Schema, model } = require('mongoose');
const Joi = require('joi');

const productSchema = Schema(
  {
    categories: {
      type: Array,
    },
    weight: {
      type: Number,
    },
    title: {
      type: Object,
    },
    calories: {
      type: Number,
    },
    groupBloodNotAllowed: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiCalcSchema = Joi.object({
  bloodType: Joi.string().valid('1', '2','3','4').required(),
  height: Joi.number().min(100).max(250).required(),
  age: Joi.number().min(18).max(100).required(),
  curWeight: Joi.number().required(),
  desWeight: Joi.number().required(),
});

const Product = model('product', productSchema);

module.exports = { Product, joiCalcSchema };
