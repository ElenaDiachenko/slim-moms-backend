const { DailyProduct } = require('../../models');
const { RequestError } = require('../../helpers');

const getProducts = async _id => {
  const result = await DailyProduct.find({ owner: _id });
  return result;
};

const getByDate = async (req, res) => {
  const { _id } = req.user;
  const { date } = req.query;

  const result = await DailyProduct.find({ date, owner: _id });

  if (!result) {
    throw RequestError(404, ' Not found');
  }

  const caloricityPerDay = result.reduce((acc, it) => {
    acc += it.calories;
    return acc;
  }, 0);

  const products = await getProducts(_id);

  const dateFirstAdded = products[0]?.date ?? new Date(date);

  res.json({
    status: 'success',
    code: 200,
    data: { result, date: new Date(date), caloricityPerDay, dateFirstAdded },
  });
};

module.exports = getByDate;
