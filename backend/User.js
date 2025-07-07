// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'modo', 'admin', 'owner', 'bot'],
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  badges: {
    type: [String],
    default: [],
  },
  country: {
    type: String,
    default: '',
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  gems: {
    type: Number,
    default: 0,
  },
  inventory: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);