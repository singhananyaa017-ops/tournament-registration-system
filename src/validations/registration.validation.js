const { param, body } = require('express-validator');

const registerPlayerValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid tournament ID'),

  body('playerId')
    .notEmpty()
    .withMessage('playerId is required')
    .isMongoId()
    .withMessage('Invalid player ID'),
];

module.exports = { registerPlayerValidation };