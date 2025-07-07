const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
  players: [
    {
      pseudo: { type: String, required: true },
      score: { type: Number, default: 0 },
      xpEarned: { type: Number, default: 0 },
      gemsEarned: { type: Number, default: 0 },
      rewards: {
        type: [String], // liste d'objets gagnés
        default: [],
      }
    }
  ],
  winner: {
    pseudo: String,
    score: Number,
  },
  statistics: {
    totalRounds: { type: Number, default: 0 },
    totalMessages: { type: Number, default: 0 },
  },
  endedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Game', gameSchema);