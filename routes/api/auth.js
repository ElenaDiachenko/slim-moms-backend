const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const { googleRedirect, googleAuth } = require('../../controllers/auth/google');
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
router.get('/google', ctrlWrapper(googleAuth));
router.get('/google-redirect', ctrlWrapper(googleRedirect));
router.get('/refresh', ctrlWrapper(ctrl.refresh));
module.exports = router;
