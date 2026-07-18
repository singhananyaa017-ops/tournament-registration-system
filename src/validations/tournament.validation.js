const { body } = require('express-validator');

const createTournamentValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Tournament name is required'),

  body('maxPlayers')
    .notEmpty()
    .withMessage('maxPlayers is required')
    .isInt({ min: 1 })
    .withMessage('maxPlayers must be greater than 0'),
];

module.exports = { createTournamentValidation };