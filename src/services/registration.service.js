const Registration = require('../models/registration.model');
const Tournament = require('../models/tournament.model');
const Player = require('../models/player.model');

const registerPlayer = async (tournamentId, playerId) => {
  // 1. Verify tournament exists
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    const error = new Error('Tournament not found');
    error.statusCode = 404;
    throw error;
  }

  // 2. Verify player exists
  const player = await Player.findById(playerId);
  if (!player) {
    const error = new Error('Player not found');
    error.statusCode = 404;
    throw error;
  }

  // 3. Prevent duplicate registration
  const existingRegistration = await Registration.findOne({
    tournament: tournamentId,
    player: playerId,
  });
  if (existingRegistration) {
    const error = new Error('Player already registered for this tournament');
    error.statusCode = 409;
    throw error;
  }

  // 4. Check capacity
  const currentRegistrationCount = await Registration.countDocuments({
    tournament: tournamentId,
  });
  if (currentRegistrationCount >= tournament.maxPlayers) {
    const error = new Error('Tournament capacity reached');
    error.statusCode = 400;
    throw error;
  }

  // 5. All checks passed — create the registration
  const registration = await Registration.create({
    tournament: tournamentId,
    player: playerId,
  });

  return registration;
};

module.exports = { registerPlayer };