const { DailyProduct } = require('../../models');
const { RequestError } = require('../../helpers');

const removeById = async (req, res) => {
  const { productId } = req.params;
  const { _id } = req.user;
  
  const removedProduct = await DailyProduct.findByIdAndRemove(productId, _id);

  if (!removedProduct) {
    throw RequestError(404, `Product with id: '${productId}'  not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: { removedProduct },
  });
};

module.exports = removeById;
