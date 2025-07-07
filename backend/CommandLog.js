const mongoose = require('mongoose');

const commandLogSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true,
  },
  command: {
    type: String,
    required: true,
    trim: true,
  },
  parameters: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  room: {
    type: String,
    trim: true,
  }
});

module.exports = mongoose.model('CommandLog', commandLogSchema);