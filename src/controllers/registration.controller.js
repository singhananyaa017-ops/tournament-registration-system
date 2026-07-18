const registrationService = require('../services/registration.service');

const registerPlayer = async (req, res, next) => {
  try {
    const { id: tournamentId } = req.params;
    const { playerId } = req.body;

    const registration = await registrationService.registerPlayer(tournamentId, playerId);

    res.status(201).json({
      success: true,
      message: 'Player registered for tournament successfully',
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerPlayer };