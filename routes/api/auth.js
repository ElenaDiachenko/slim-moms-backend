const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const {
  ctrlWrapper,
  userRegisterValidation,
  userLoginValidation,
  auth,
  // validation,
} = require('../../middelwares');

router.post('/register', userRegisterValidation, ctrlWrapper(ctrl.register));
router.post('/login', userLoginValidation, ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;
