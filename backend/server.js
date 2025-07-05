const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connecté à MongoDB'))
.catch((err) => console.error('❌ Erreur MongoDB :', err));
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connecté à MongoDB'))
.catch((err) => console.error('❌ Erreur MongoDB :', err));

// Routes API
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
app.use('/api/auth', authRoutes);
app.use('/admin', adminRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('🎉 API Tchat Caribbean fonctionne !');
});

// Socket
io.on('connection', (socket) => {
  console.log('✅ Utilisateur connecté via Socket.io');

 socket.on('message', async (msg) => {
  const { author, content } = msg;

  try {
    const user = await User.findOne({ pseudo: author });

    const fullMessage = {
      author,
      content,
      badge: user?.badge?.verified ? {
        verified: true,
        color: user.badge.color,
        symbol: user.badge.symbol
      } : null
    };

    io.emit('message', fullMessage);
  } catch (err) {
    console.error('Erreur lors de l’envoi du message avec badge :', err);
  }
});

  socket.on('disconnect', () => {
    console.log('❌ Utilisateur déconnecté');
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
});