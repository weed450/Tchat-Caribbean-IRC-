// backend/models/Message.js
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
  badge: {
    verified: { type: Boolean, default: false },
    color: { type: String, default: null },
    symbol: { type: String, default: null },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Message', messageSchema);