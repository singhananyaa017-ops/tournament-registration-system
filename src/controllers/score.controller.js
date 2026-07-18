const scoreService = require('../services/score.service');

const submitScore = async (req, res, next) => {
  try {
    const { id: tournamentId } = req.params;
    const { playerId, score } = req.body;

    const result = await scoreService.submitScore(tournamentId, playerId, score);

    res.status(200).json({
      success: true,
      message: 'Score submitted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getLeaderboard = async (req, res, next) => {
  try {
    const { id: tournamentId } = req.params;
    const leaderboard = await scoreService.getLeaderboard(tournamentId);

    res.status(200).json({
      success: true,
      message: 'Leaderboard fetched successfully',
      data: leaderboard,
    });
  } catch (error) {
    next(error);
  }
};

const getPlayerRank = async (req, res, next) => {
  try {
    const { id: tournamentId, playerId } = req.params;
    const result = await scoreService.getPlayerRank(tournamentId, playerId);

    res.status(200).json({
      success: true,
      message: 'Player rank fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitScore, getLeaderboard, getPlayerRank };