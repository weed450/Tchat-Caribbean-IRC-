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
    default: 'general',
  },
  badge: {
    type: Object,
    default: null,
  },
}, {
  timestamps: true, // createdAt, updatedAt automatiques
});

module.exports = mongoose.model('Message', messageSchema);
