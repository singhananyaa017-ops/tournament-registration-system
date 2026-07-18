const Player = require('../models/player.model');

const createPlayer = async (playerData) => {
  const existingPlayer = await Player.findOne({ email: playerData.email });

  if (existingPlayer) {
    const error = new Error('Email already registered');
    error.statusCode = 409; // Conflict
    throw error;
  }

  const player = await Player.create(playerData);
  return player;
};

module.exports = { createPlayer };
