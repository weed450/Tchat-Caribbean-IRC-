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
function handleFunCommand(message, socket) {
  const cmd = message.trim().toLowerCase();
  if (cmd === '!joke') {
    const jokes = [
      "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant? Parce que sinon ils tombent dans le bateau !",
      "Quel est le comble pour un électricien? De ne pas être au courant.",
      "Pourquoi les maths adorent les arbres ? Parce qu’ils ont plein de racines !"
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    socket.emit('botMessage', `😂 FunBot dit : ${joke}`);
    return true;
  }
  if (cmd.startsWith('!dice')) {
    const roller = Math.floor(Math.random() * 6) + 1;
    socket.emit('botMessage', `🎲 FunBot a roulé un dé : ${roller}`);
    return true;
  }
  return false; // Pas une commande fun
}

module.exports = { handleFunCommand };