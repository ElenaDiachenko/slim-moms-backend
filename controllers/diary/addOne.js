const { DailyProduct } = require('../../models');

const addOne = async (req, res) => {
  const { _id } = req.user;
  const { weight, product, date, baseCaloricity } = req.body;

  const calories = (baseCaloricity * weight) / 100;

  const duplicateProduct = await DailyProduct.findOne({
    product,
    date,
    owner: _id,
  });
  let result;

  if (!duplicateProduct) {
    result = await DailyProduct.create({
      weight,
      product,
      date,
      baseCaloricity,
      calories,
      owner: _id,
    });
  }
  if (duplicateProduct) {
    result = await DailyProduct.findByIdAndUpdate(
      { _id: duplicateProduct._id },
      {
        product: duplicateProduct.product,
        weight: Math.round(duplicateProduct.weight + weight),
        calories: Math.round(duplicateProduct.calories + calories),
      },

      {
        new: true,
      }
    );
  }
  res.status(!duplicateProduct ? 201 : 200).json({
    status: 'success',
    code: !duplicateProduct ? 201 : 200,
    result,
  });
};

module.exports = addOne;
