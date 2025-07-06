// ModBot logic
// backend/ModBot.js

function isSpam(message) {
  return message.length > 500 || message.includes('http');
}

function isOffensive(message) {
  const blacklist = ['merde', 'putain', 'con']; // à personnaliser
  return blacklist.some(word => message.toLowerCase().includes(word));
}

function isCapsLock(message) {
  const ratio = message.replace(/[^A-Z]/g, '').length / message.length;
  return message.length > 10 && ratio > 0.7;
}

function handleCommand(message, socket) {
  const command = message.trim().toLowerCase();
  if (command === '!help') {
    socket.emit('botMessage', '📌 Commandes disponibles : !help, !rules, !mod');
  } else if (command === '!rules') {
    socket.emit('botMessage', '📜 Règles : Pas d’insultes, pas de spam, pas de majuscules abusives.');
  } else if (command === '!mod') {
    socket.emit('botMessage', '👮 Le ModBot veille !');
  }
}

function handleMessage(message, socket, io) {
  if (message.startsWith('!')) {
    return handleCommand(message, socket);
  }

  if (isSpam(message)) {
    socket.emit('botWarning', '🚨 Message supprimé pour spam.');
    return false;
  }

  if (isOffensive(message)) {
    socket.emit('botWarning', '🚫 Message supprimé pour propos inappropriés.');
    return false;
const ModBot = require('./ModBot');

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    if (!ModBot.handleMessage(msg.content, socket, io)) return;

    // Suite logique : badge, envoi, sauvegarde
    const badgeMap = {...};
    const fullMessage = {
      ...msg,
      badge: badgeMap[msg.author] || null
    };

    io.to(msg.room).emit('message', fullMessage);
  });
});