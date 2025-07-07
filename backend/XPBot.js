const XPBot = require('./XPBot');
// backend/XPBot.js

const usersXP = new Map(); // En mémoire, sinon utilise MongoDB si tu veux persister

function handleXP(pseudo) {
  const currentXP = usersXP.get(pseudo) || 0;
  const newXP = currentXP + 10; // +10 XP par message
  usersXP.set(pseudo, newXP);

  console.log(`🧠 ${pseudo} a maintenant ${newXP} XP.`);
}

function getXP(pseudo) {
  return usersXP.get(pseudo) || 0;
}

module.exports = { handleXP, getXP };
function handleCommand(msg, socket) {
  if (msg.trim().toLowerCase() === '!xp') {
    const xp = getXP(socket.pseudo || 'Anonyme');
    socket.emit('botMessage', `📊 Tu as ${xp} XP.`);
    return true; // commande gérée
  }
  return false; // pas une commande reconnue
}