const Score = require('../models/score.model');
const Registration = require('../models/registration.model');
const Tournament = require('../models/tournament.model');

const submitScore = async (tournamentId, playerId, scoreValue) => {
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    const error = new Error('Tournament not found');
    error.statusCode = 404;
    throw error;
  }

  const registration = await Registration.findOne({
    tournament: tournamentId,
    player: playerId,
  });
  if (!registration) {
    const error = new Error('Player is not registered for this tournament');
    error.statusCode = 403;
    throw error;
  }

  const score = await Score.findOneAndUpdate(
    { tournament: tournamentId, player: playerId },
    { score: scoreValue },
    { new: true, upsert: true, runValidators: true }
  );

  return score;
};

const getLeaderboard = async (tournamentId) => {
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    const error = new Error('Tournament not found');
    error.statusCode = 404;
    throw error;
  }

  const scores = await Score.find({ tournament: tournamentId })
    .sort({ score: -1 })
    .populate('player', 'name email country');

  const leaderboard = scores.map((entry, index) => ({
    rank: index + 1,
    player: entry.player,
    score: entry.score,
  }));

  return leaderboard;
};

const getPlayerRank = async (tournamentId, playerId) => {
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    const error = new Error('Tournament not found');
    error.statusCode = 404;
    throw error;
  }

  const leaderboard = await getLeaderboard(tournamentId);

  const entry = leaderboard.find((e) => e.player._id.toString() === playerId);

  if (!entry) {
    const error = new Error('Player has no score recorded in this tournament');
    error.statusCode = 404;
    throw error;
  }

  return entry;
};

module.exports = { submitScore, getLeaderboard, getPlayerRank };