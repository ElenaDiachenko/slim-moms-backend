const { DailyProduct } = require('../../models');

// const getProducts = async () => {
//   const result = await BloodDietProduct.find({});
//   return result;
// };

const addOne = async (req, res) => {
  const { _id } = req.user;

  const { weight, product, date, baseCaloricity } = req.body;
  // const products = await getProducts();

  // const productCaloricity = products.find(
  //   it => it.title.ua === product
  // ).calories;

  const calories = (baseCaloricity * weight) / 100;

  const savedProduct = await DailyProduct.find({ date, owner: _id });

  const duplicateProduct = await savedProduct.find(
    it => it.product === product
  );

  let result;

  if (!duplicateProduct) {
    result = await DailyProduct.create({
      ...req.body,
      calories,
      owner: _id,
    });
  } else {
    result = await DailyProduct.findByIdAndUpdate(
      duplicateProduct._id,
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

  !duplicateProduct
    ? res.status(201).json({
        status: 'succes',
        code: 201,
        result,
      })
    : res.status(200).json({
        status: 'succes',
        code: 200,
        result,
      });
};

module.exports = addOne;
