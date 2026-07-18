const playerService = require('../services/player.service');

const createPlayer = async (req, res, next) => {
  try {
    const { name, email, country } = req.body;
    const player = await playerService.createPlayer({ name, email, country });

    res.status(201).json({
      success: true,
      message: 'Player registered successfully',
      data: player,
    });
  } catch (error) {
    next(error); // passes to centralized errorHandler
  }
};

module.exports = { createPlayer };