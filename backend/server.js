const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
require('dotenv').config();

const FunBot = require('./FunBot');
const XPBot = require('./XPBot');
const ModBot = require('./ModBot');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
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

// Liste des utilisateurs connectés
let connectedUsers = new Set();

// Socket.io
io.on('connection', (socket) => {
  console.log('✅ Utilisateur connecté');

  // Pseudo tracking
  socket.on('join', ({ pseudo }) => {
    socket.pseudo = pseudo;
    connectedUsers.add(pseudo);
    io.emit('users', Array.from(connectedUsers));
  });

  socket.on('registerPseudo', (pseudo) => {
    socket.pseudo = pseudo;
    connectedUsers.add(pseudo);
    io.emit('users', Array.from(connectedUsers));
  });

  // Réception des messages
  socket.on('message', async (msg) => {
    const { author, content, room = 'general' } = msg;

    // 🎯 Bot FUN (commandes humoristiques)
    if (FunBot.handleFunCommand(content, socket)) return;

    // 🔒 Bot MODÉRATION
    if (!ModBot.handleMessage(content, socket, io)) return;

    // 🧠 XP Bot
    XPBot.handleXP(author);

    // ✅ Gestion des badges manuels
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

    // Envoi à tous dans le salon
    io.emit('message', fullMessage);

    // Sauvegarde en base de données
    try {
      await Message.create({
        pseudo: author,
        content,
        room,
        badge: fullMessage.badge,
      });
    } catch (err) {
      console.error('❌ Erreur enregistrement message :', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ Utilisateur déconnecté');
    if (socket.pseudo) {
      connectedUsers.delete(socket.pseudo);
      io.emit('users', Array.from(connectedUsers));
    }
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
});