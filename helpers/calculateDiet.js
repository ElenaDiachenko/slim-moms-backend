const { Product } = require('../models');
const { RequestError } = require('../helpers');

const calculateDiet = async ({
  bloodType,
  height,
  age,
  curWeight,
  desWeight,
}) => {
  const dailyCalorie = Math.round(
    10 * curWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (curWeight - desWeight)
  );

  const products = await Product.find({});

  const notRecProducts = products.filter(
    product => product.groupBloodNotAllowed[bloodType] === true
  );
  if (!notRecProducts.length) {
    throw RequestError(404, 'Not found');
  }
  const result = {
    bloodType,
    height,
    age,
    curWeight,
    desWeight,
    dailyCalorie,
    notRecProducts,
  };
  return result;
};

module.exports = calculateDiet;
