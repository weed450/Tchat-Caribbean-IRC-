// backend/socket.js
const ModBot = require('./ModBot');

module.exports = function (io) {
  const usersInRoom = {}; // { room: [pseudo1, pseudo2, ...] }

  io.on('connection', (socket) => {
    console.log('📡 Un utilisateur est connecté');

    socket.on('join', ({ pseudo, room }) => {
      socket.join(room);
      socket.pseudo = pseudo;
      socket.room = room;

      if (!usersInRoom[room]) usersInRoom[room] = [];
      if (!usersInRoom[room].includes(pseudo)) usersInRoom[room].push(pseudo);

      // Broadcast des utilisateurs connectés
      io.to(room).emit('users', usersInRoom[room]);

      // Messages de bienvenue
      socket.emit('botMessage', `🎉 Bienvenue ${pseudo} dans le salon #${room}`);
      socket.to(room).emit('botMessage', `👋 ${pseudo} a rejoint le salon`);
    });

    socket.on('message', (msg) => {
      if (!ModBot.handleMessage(msg.content, socket)) return;

      const badgeMap = {
        'admin': { verified: true, color: 'green', symbol: '@' },
        'owner': { verified: true, color: 'yellow', symbol: '@' },
        'bot': { verified: true, color: 'black', symbol: '✓' },
        'modo': { verified: true, color: 'red', symbol: '@' },
        'user': null,
      };

      const fullMessage = {
        ...msg,
        badge: badgeMap[msg.role] || null
      };

      io.to(msg.room).emit('message', fullMessage);
    });

    socket.on('disconnect', () => {
      const { pseudo, room } = socket;
      if (room && usersInRoom[room]) {
        usersInRoom[room] = usersInRoom[room].filter((u) => u !== pseudo);
        io.to(room).emit('users', usersInRoom[room]);
        socket.to(room).emit('botMessage', `🚪 ${pseudo} a quitté le salon`);
      }
    });
  });
};