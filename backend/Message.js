// Message model
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String, // utilisé pour les messages privés
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Message', messageSchema);