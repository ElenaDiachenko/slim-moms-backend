const express = require('express');
const router = express.Router();
const { getDiet } = require('../../controllers/products');
const ctrl = require('../../controllers/products');
const { ctrlWrapper, validation, auth } = require('../../middelwares');
const { joiCalcSchema } = require('../../models/product');

router.post('/', validation(joiCalcSchema), ctrlWrapper(getDiet));
router.get('/', ctrlWrapper(ctrl.allProducts));
router.get('/query', auth, ctrlWrapper(ctrl.queryProducts));
// router.post('/:id', auth, ctrlWrapper(ctrl.bloodDietProductUser));

module.exports = router;
