const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tournament',
      required: true,
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent the same player registering twice for the same tournament
registrationSchema.index({ tournament: 1, player: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);