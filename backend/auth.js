const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Inscription
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

// Connexion
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