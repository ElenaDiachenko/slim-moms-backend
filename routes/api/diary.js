const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/diary');
const { ctrlWrapper, validation, auth } = require('../../middelwares');
const { joiSchema } = require('../../models/diary');

router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.addOne));
router.get('/', auth, ctrlWrapper(ctrl.getByDate));
router.delete('/:productId', auth, ctrlWrapper(ctrl.removeById));

module.exports = router;
