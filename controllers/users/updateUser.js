const { User } = require('../../models');
const { Product } = require('../../models');
const { RequestError } = require('../../helpers');

const updateUser = async (req, res) => {
  const { bloodType, height, age, curWeight, desWeight } = req.body;
  const { _id } = req.user;

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

  await User.findByIdAndUpdate(
    _id,
    {
      bloodType,
      height,
      age,
      curWeight,
      desWeight,
      dailyCalorie,
      notRecProducts,
    },
    {
      new: true,
    }
  );

  const user = {
    bloodType,
    height,
    age,
    curWeight,
    desWeight,
    dailyCalorie,
    notRecProducts,
  };

  res.json({
    status: 'success',
    code: 200,
    data: {
      user,
    },
  });
};

module.exports = updateUser;
