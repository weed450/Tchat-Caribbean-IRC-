const XPBot = require('./XPBot');
const Message = require('./models/Message'); //
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
const FunBot = require('./FunBot');

app.use(express.json());

// 🔌 Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connecté à MongoDB'))
.catch((err) => console.error('❌ Erreur MongoDB :', err));

// 📦 Routes API
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
app.use('/api/auth', authRoutes);
app.use('/admin', adminRoutes);

// ✅ Route test
app.get('/', (req, res) => {
  res.send('🎉 API Tchat Caribbean fonctionne !');
});

// 🌐 Gestion utilisateurs connectés
let connectedUsers = new Set();

// 🔌 Socket.io unifié
io.on('connection', (socket) => {
  console.log('✅ Utilisateur connecté via Socket.io');

  // Reçoit le pseudo et l’ajoute à la liste
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

  // Message avec badge
  XPBot.handleXP(msg.author);
socket.on('message', (msg) => {
  // 👉 vérifie d'abord les commandes FunBot
  if (FunBot.handleFunCommand(msg.content, socket)) return;

  // ensuite, le reste (ModBot, badges, etc.)
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
    badge: badgeMap[msg.author] || null,
  };

  io.emit('message', fullMessage);
});