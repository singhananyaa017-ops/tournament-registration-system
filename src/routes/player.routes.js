const express = require('express');
const router = express.Router();

const { createPlayer } = require('../controllers/player.controller');
const { createPlayerValidation } = require('../validations/player.validation');
const validate = require('../middlewares/validate');

router.post('/', createPlayerValidation, validate, createPlayer);

module.exports = router;