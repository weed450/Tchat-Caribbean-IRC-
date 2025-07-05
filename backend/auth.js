// Auth routes
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./User');

// Clé secrète pour JWT (à mettre dans .env en prod)
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Route d'inscription
router.post('/signup', async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const existing = await User.findOne({ pseudo });
    if (existing) return res.status(400).json({ message: 'Pseudo déjà pris' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      pseudo,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: 'Compte créé avec succès' });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  const { pseudo, password } = req.body;

  try {
    const user = await User.findOne({ pseudo });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).json({ token, user });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
// middleware/isAdmin.js
module.exports = function (req, res, next) {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'owner')) {
    return res.status(403).json({ error: 'Accès refusé' });
  }
  next();
};
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const isAdmin = require('../middleware/isAdmin');

// POST /admin/badge
router.post('/badge', isAdmin, async (req, res) => {
  const { pseudo, color } = req.body;

  const badgeConfig = {
    gold: '@',
    green: '@',
    blue: '+',
    pink: '✓',
    red: '@',
    black: '✓',
  };

  if (!badgeConfig[color]) {
    return res.status(400).json({ error: 'Couleur invalide' });
  }

  try {
    const user = await User.findOne({ pseudo });
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });

    user.badge = {
      verified: true,
      color,
      symbol: badgeConfig[color],
    };

    await user.save();
    res.json({ message: 'Badge assigné avec succès', user });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
