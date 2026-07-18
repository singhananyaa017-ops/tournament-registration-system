const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema(
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
    score: {
      type: Number,
      required: [true, 'Score is required'],
      min: [0, 'Score must be greater than or equal to 0'],
    },
  },
  { timestamps: true }
);

// One score record per player per tournament — resubmission updates this
scoreSchema.index({ tournament: 1, player: 1 }, { unique: true });

module.exports = mongoose.model('Score', scoreSchema);