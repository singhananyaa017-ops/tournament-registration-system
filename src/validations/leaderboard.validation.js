const { param } = require('express-validator');

const leaderboardValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid tournament ID'),
];

module.exports = { leaderboardValidation };