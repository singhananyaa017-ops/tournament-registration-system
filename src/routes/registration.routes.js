const express = require('express');
const router = express.Router();

const { registerPlayer } = require('../controllers/registration.controller');
const { registerPlayerValidation } = require('../validations/registration.validation');
const validate = require('../middlewares/validate');

router.post('/:id/register', registerPlayerValidation, validate, registerPlayer);

module.exports = router;