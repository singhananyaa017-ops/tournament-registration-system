const express = require('express');
const router = express.Router();

const { createTournament } = require('../controllers/tournament.controller');
const { createTournamentValidation } = require('../validations/tournament.validation');
const validate = require('../middlewares/validate');

router.post('/', createTournamentValidation, validate, createTournament);

module.exports = router;