// Command logs model
// backend/models/CommandLog.js

const mongoose = require('mongoose');

const commandLogSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  command: {
    type: String,
    required: true,
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
  }
});

module.exports = mongoose.model('CommandLog', commandLogSchema);