// Express + Socket.IO server setup
// backend/app.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { handleFunBotCommand } = require('./FunBot');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Pour autoriser toutes les connexions front
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.get('/', (req, res) => {
  res.send('🌐 Serveur Tchat Caribbean IRC en ligne !');
});

io.on('connection', (socket) => {
  console.log(`✅ Utilisateur connecté : ${socket.id}`);

  socket.on('message', (msg) => {
    if (msg.startsWith('!')) {
      handleFunBotCommand(msg, socket); // Commandes bot comme !joke, !roll
    } else {
      io.emit('chatMessage', msg); // Diffuse à tout le monde
    }
  });

  socket.on('disconnect', () => {
    console.log(`❌ Utilisateur déconnecté : ${socket.id}`);
  });
});

// Port d'écoute
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
});