const tournamentService = require('../services/tournament.service');

const createTournament = async (req, res, next) => {
  try {
    const { name, maxPlayers } = req.body;
    const tournament = await tournamentService.createTournament({ name, maxPlayers });

    res.status(201).json({
      success: true,
      message: 'Tournament created successfully',
      data: tournament,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTournament };