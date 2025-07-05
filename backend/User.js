// User model
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
    default: false, // Badge bleu ✅
  },
  badges: {
    type: [String], // ['ancien', 'supporter', 'top1', ...]
    default: [],
  },
  country: String, // Pour la mini-carte interactive
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
    type: [String], // liste d'objets (id ou nom)
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);