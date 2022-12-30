const { BloodDietProduct } = require('../../models');
const { RequestError } = require('../../helpers');

const queryProducts = async (req, res) => {
  const { title } = req.query;

  const result = await BloodDietProduct.find();

  const matchedProducts = result.filter(product =>
    product.title.ua.toLowerCase().includes(title)
  );

  const queryProducts = matchedProducts.map(product => {
    return {
      id: product._id,
      title: product.title.ua,
      calories: product.calories,
    };
  });
  if (!queryProducts.length) {
    throw RequestError(404, 'Not found ');
  }

  res.json({
    status: 'success',
    code: 200,
    queryProducts,
  });
};

module.exports = queryProducts;
