const { Product } = require('../../models');

const allProducts = async (req, res) => {
  const result = await Product.find({});

  res.json({
    status: 'success',
    code: 200,
    result,
  });
};

module.exports = allProducts;
