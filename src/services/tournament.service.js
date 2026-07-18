const Tournament = require('../models/tournament.model');

const createTournament = async (tournamentData) => {
  const tournament = await Tournament.create(tournamentData);
  return tournament;
};

module.exports = { createTournament };