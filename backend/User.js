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
    default: false, // Pour badge bleu Twitter
  },
  badges: {
    type: [String], // ex: ['supporter', 'ancien', 'top1']
    default: [],
  },
  country: {
    type: String,
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
}, { timestamps: true }); // ✅ Ajoute createdAt & updatedAt

module.exports = mongoose.model('User', userSchema);