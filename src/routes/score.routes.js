const express = require('express');
const router = express.Router();

const { submitScore, getLeaderboard, getPlayerRank } = require('../controllers/score.controller');
const { submitScoreValidation } = require('../validations/score.validation');
const { leaderboardValidation } = require('../validations/leaderboard.validation');
const { playerRankValidation } = require('../validations/playerRank.validation');
const validate = require('../middlewares/validate');

router.post('/:id/score', submitScoreValidation, validate, submitScore);
router.get('/:id/leaderboard', leaderboardValidation, validate, getLeaderboard);
router.get('/:id/player/:playerId', playerRankValidation, validate, getPlayerRank);

module.exports = router;