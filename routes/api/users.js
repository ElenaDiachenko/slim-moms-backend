const express = require('express');
const ctrl = require('../../controllers/users');
const { ctrlWrapper, auth, validation } = require('../../middelwares');
const { joiCalcSchema } = require('../../models/product');

const router = express.Router();

router.patch(
  '/update',
  auth,
  validation(joiCalcSchema),
  ctrlWrapper(ctrl.updateUser)
);

module.exports = router;
