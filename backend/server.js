// server.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
require('dotenv').config();

const FunBot = require('./FunBot');
const XPBot = require('./XPBot');
const ModBot = require('./ModBot');
const GameBot = require('./GameBot');  // <-- Import GameBot
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }, // En prod, limiter aux URL frontend
});

app.use(express.json());

// Connexion MongoDB
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

// Gestion des utilisateurs connectés par salon
const connectedUsers = {}; // { roomName: Set(pseudos) }

io.on('connection', (socket) => {
  console.log('✅ Utilisateur connecté');

  socket.on('join', ({ pseudo, room = 'general' }) => {
    socket.pseudo = pseudo;
    socket.room = room;
    socket.join(room);

    if (!connectedUsers[room]) connectedUsers[room] = new Set();
    connectedUsers[room].add(pseudo);

    // Envoyer liste utilisateurs à la room
    io.to(room).emit('users', Array.from(connectedUsers[room]));
    // Message bot bienvenue
    io.to(room).emit('botMessage', `🎉 ${pseudo} a rejoint le salon #${room}`);
  });

  socket.on('message', async (msg) => {
    try {
      const { author, content, room = 'general' } = msg;

      // Bot FUN
      if (FunBot.handleFunCommand(content, socket)) return;

      // Bot MODÉRATION
      if (!ModBot.handleMessage(content, socket, io)) return;

      // Bot GAMES (ajout)
      if (GameBot.handleGameCommand(content, socket, io)) return;

      // Bot XP
      XPBot.handleXP(author);

      // Badges manuels (à adapter)
      const badgeMap = {
        'Maiä':         { verified: true, color: 'gold',  symbol: '@' },
        'AdminJoe':     { verified: true, color: 'green', symbol: '@' },
        'VérifiéMax':   { verified: true, color: 'blue',  symbol: '+' },
        'SupportGirl':  { verified: true, color: 'pink',  symbol: '✓' },
        'ModLisa':      { verified: true, color: 'red',   symbol: '@' },
        'BotCaribbean': { verified: true, color: 'black', symbol: '✓' },
      };

      const fullMessage = {
        author,
        content,
        room,
        badge: badgeMap[author] || null,
      };

      io.to(room).emit('message', fullMessage);

      // Sauvegarde en base
      await Message.create({
        pseudo: author,
        content,
        room,
        badge: fullMessage.badge,
      });
    } catch (err) {
      console.error('❌ Erreur message socket:', err);
    }
  });

  socket.on('disconnect', () => {
    const { pseudo, room } = socket;
    if (room && connectedUsers[room]) {
      connectedUsers[room].delete(pseudo);

      // Mise à jour liste utilisateurs dans la room
      io.to(room).emit('users', Array.from(connectedUsers[room]));
      io.to(room).emit('botMessage', `🚪 ${pseudo} a quitté le salon`);
    }
    console.log('❌ Utilisateur déconnecté');
  });
});

// Lancer serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
});