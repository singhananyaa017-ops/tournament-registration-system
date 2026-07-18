const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tournament name is required'],
      trim: true,
    },
    maxPlayers: {
      type: Number,
      required: [true, 'maxPlayers is required'],
      min: [1, 'maxPlayers must be greater than 0'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tournament', tournamentSchema);