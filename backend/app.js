// backend/server.js (fusion complet)

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const XPBot = require('./XPBot');
const FunBot = require('./FunBot');
const ModBot = require('./ModBot');
const Message = require('./models/Message');
const User = require('./models/User');
const Game = require('./models/Game');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connecté à MongoDB');
}).catch(err => {
  console.error('❌ Erreur MongoDB :', err);
});

// Routes API
app.use('/api/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

// Route test
app.get('/', (req, res) => {
  res.send('🎉 API Tchat Caribbean IRC fonctionne !');
});

// Utilisateurs connectés
let connectedUsers = new Set();

// SOCKET.IO
io.on('connection', (socket) => {
  console.log(`✅ Connecté via socket : ${socket.id}`);

  socket.on('join', ({ pseudo, room }) => {
    socket.pseudo = pseudo;
    connectedUsers.add(pseudo);
    socket.join(room || 'general');
    io.emit('users', Array.from(connectedUsers));
  });

  socket.on('registerPseudo', (pseudo) => {
    socket.pseudo = pseudo;
    connectedUsers.add(pseudo);
    io.emit('users', Array.from(connectedUsers));
  });

  socket.on('message', async (msg) => {
    const { author, content, room = 'general' } = msg;

    if (FunBot.handleFunCommand(content, socket)) return;
    if (!ModBot.handleMessage(content, socket, io)) return;
    XPBot.handleXP(author);

    const badgeMap = {
      'Maiä':         { verified: true, color: 'gold',  symbol: '@' },
      'AdminJoe':     { verified: true, color: 'green', symbol: '@' },
      'VérifiéMax':   { verified: true, color: 'blue',  symbol: '+' },
      'SupportGirl':  { verified: true, color: 'pink',  symbol: '✓' },
      'ModLisa':      { verified: true, color: 'red',   symbol: '@' },
      'BotCaribbean': { verified: true, color: 'black', symbol: '✓' },
    };

    const fullMessage = {
      ...msg,
      badge: badgeMap[author] || null,
    };

    // Sauvegarde dans MongoDB
    const newMsg = new Message({
      pseudo: author,
      content,
      room,
      badge: fullMessage.badge,
    });
    await newMsg.save();

    io.to(room).emit('message', fullMessage);
  });

  socket.on('disconnect', () => {
    if (socket.pseudo) {
      connectedUsers.delete(socket.pseudo);
      io.emit('users', Array.from(connectedUsers));
    }
    console.log(`❌ Déconnecté : ${socket.id}`);
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
});