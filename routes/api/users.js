const express = require('express');
const ctrl = require('../../controllers/users');
const { ctrlWrapper, auth, validation } = require('../../middelwares');
const { UserJoiSchema } = require('../../models/user');

const router = express.Router();

router.patch(
  '/update',
  auth,
  validation(UserJoiSchema),
  ctrlWrapper(ctrl.updateUser)
);
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
