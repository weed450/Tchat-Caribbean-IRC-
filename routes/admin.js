const Message = require('../models/Message');
const Item = require('../models/Item'); // si tu gères des objets dans une boutique

// ➕ Modifier XP ou Gems
router.post('/update-stats', async (req, res) => {
  const { pseudo, xp = 0, gems = 0 } = req.body;

  try {
    const user = await User.findOne({ pseudo });
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    user.xp += xp;
    user.gems += gems;
    await user.save();

    res.json({ message: 'Statistiques mises à jour', user });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🧺 Modifier inventaire
router.post('/inventory', async (req, res) => {
  const { pseudo, action, item } = req.body; // action = "add" ou "remove"

  try {
    const user = await User.findOne({ pseudo });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    if (action === 'add') {
      if (!user.inventory.includes(item)) user.inventory.push(item);
    } else if (action === 'remove') {
      user.inventory = user.inventory.filter(i => i !== item);
    }

    await user.save();
    res.json({ message: 'Inventaire mis à jour', inventory: user.inventory });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 📜 Récupérer les messages d’un utilisateur
router.get('/logs/:pseudo', async (req, res) => {
  const { pseudo } = req.params;

  try {
    const logs = await Message.find({ pseudo }).sort({ timestamp: -1 }).limit(50);
    res.json({ logs });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
