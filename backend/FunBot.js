// FunBot logic
// backend/FunBot.js

function handleFunBotCommand(message, socket) {
  const command = message.trim().toLowerCase();

  if (command === '!joke') {
    socket.emit('botMessage', '😄 Pourquoi les devs aiment le café ? Parce qu’ils codent en Java !');
  }

  if (command === '!roll') {
    const roll = Math.floor(Math.random() * 6) + 1;
    socket.emit('botMessage', `🎲 Tu as lancé un dé : ${roll}`);
  }

  if (command === '!guess') {
    const number = Math.floor(Math.random() * 10) + 1;
    socket.emit('botMessage', `🎯 Devine un nombre entre 1 et 10... C’était ${number}`);
  }
}

module.exports = { handleFunBotCommand };