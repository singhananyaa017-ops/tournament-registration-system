const { param } = require('express-validator');

const playerRankValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid tournament ID'),

  param('playerId')
    .isMongoId()
    .withMessage('Invalid player ID'),
];

module.exports = { playerRankValidation };