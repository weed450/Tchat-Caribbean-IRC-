const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// 🔐 Inscription
router.post('/signup', async (req, res) => {
  const { pseudo, email, password } = req.body;

  if (!pseudo || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const existing = await User.findOne({ pseudo: pseudo.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ message: 'Ce pseudo est déjà pris.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      pseudo: pseudo.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: '✅ Compte créé avec succès' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '❌ Erreur interne serveur.' });
  }
});

// 🔐 Connexion
router.post('/login', async (req, res) => {
  const { pseudo, password } = req.body;

  if (!pseudo || !password) {
    return res.status(400).json({ message: 'Pseudo et mot de passe obligatoires.' });
  }

  try {
    const user = await User.findOne({ pseudo: pseudo.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // On n'envoie pas le mot de passe au client
    const { password: _, ...userData } = user.toObject();

    return res.status(200).json({
      message: 'Connexion réussie !',
      token,
      user: userData,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '❌ Erreur serveur' });
  }
});

module.exports = router;