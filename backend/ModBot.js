// backend/ModBot.js

function isSpam(message) {
  return message.length > 500 || message.includes('http');
}

function isOffensive(message) {
  const blacklist = ['merde', 'putain', 'con']; // Ajoute ici d'autres mots
  return blacklist.some(word => message.toLowerCase().includes(word));
}

function isCapsLock(message) {
  const letters = message.replace(/[^A-Za-z]/g, '');
  const ratio = letters.length > 0 ? message.replace(/[^A-Z]/g, '').length / letters.length : 0;
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

function handleMessage(message, socket) {
  if (message.startsWith('!')) {
    handleCommand(message, socket);
    return false; // on ne diffuse pas
  }

  if (isSpam(message)) {
    socket.emit('botWarning', '🚨 Message supprimé pour spam.');
    return false;
  }

  if (isOffensive(message)) {
    socket.emit('botWarning', '🚫 Message supprimé pour propos inappropriés.');
    return false;
  }

  if (isCapsLock(message)) {
    socket.emit('botWarning', '⚠️ Merci d’éviter les MAJUSCULES abusives.');
    return false;
  }

  return true;
}

module.exports = {
  handleMessage,
};