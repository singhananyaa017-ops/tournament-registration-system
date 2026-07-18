const { param, body } = require('express-validator');

const submitScoreValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid tournament ID'),

  body('playerId')
    .notEmpty()
    .withMessage('playerId is required')
    .isMongoId()
    .withMessage('Invalid player ID'),

  body('score')
    .notEmpty()
    .withMessage('score is required')
    .isFloat({ min: 0 })
    .withMessage('score must be greater than or equal to 0'),
];

module.exports = { submitScoreValidation };