const { User } = require('../../models');
const { calculateDiet } = require('../../helpers');

const updateUser = async (req, res) => {
  const { _id } = req.user;

  const data = await calculateDiet(req.body);
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      ...data,
    },
    {
      new: true,
    }
  );

  const user = {
    bloodType: updatedUser.bloodType,
    height: updatedUser.height,
    age: updatedUser.age,
    curWeight: updatedUser.curWeight,
    desWeight: updatedUser.desWeight,
    dailyCalorie: updatedUser.dailyCalorie,
    notRecProducts: updatedUser.notRecProducts,
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
