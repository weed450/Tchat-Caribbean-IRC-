// backend/GameBot.js

const activeGames = new Map(); // Map room -> game state

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollMultipleDice(count, sides) {
  const rolls = [];
  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  return rolls;
}

function startGuessGame(io, room) {
  const target = Math.floor(Math.random() * 100) + 1;
  activeGames.set(room, { type: 'guess', target, attempts: 0 });
  io.to(room).emit('botMessage', `🎲 Jeu "Devine le nombre" démarré ! Devinez un nombre entre 1 et 100.`);
}

function startQuiz(io, room) {
  const questions = [
    { q: "Quelle est la capitale de la France ?", a: "paris" },
    { q: "Combien de continents ?", a: "7" },
    { q: "Quelle couleur mélange bleu et jaune ?", a: "vert" },
  ];
  const chosen = questions[Math.floor(Math.random() * questions.length)];
  activeGames.set(room, { type: 'quiz', answer: chosen.a.toLowerCase() });
  io.to(room).emit('botMessage', `❓ Quiz : ${chosen.q} (Répondez avec !answer <votre réponse>)`);
}

function handleBlackjack(socket, io) {
  // Simplifié : tirage 2 cartes 1-11 + possibilité de tirer encore
  // Pour faire simple, ici tirage unique et comparaison
  const playerTotal = Math.floor(Math.random() * 21) + 1;
  const dealerTotal = Math.floor(Math.random() * 21) + 1;
  let result = '';
  if (playerTotal > 21) result = 'Vous avez dépassé 21, perdu !';
  else if (dealerTotal > 21) result = 'Le croupier dépasse 21, vous gagnez !';
  else if (playerTotal > dealerTotal) result = `Vous gagnez avec ${playerTotal} contre ${dealerTotal}`;
  else if (playerTotal < dealerTotal) result = `Vous perdez avec ${playerTotal} contre ${dealerTotal}`;
  else result = 'Égalité !';
  io.to(socket.room).emit('botMessage', `🃏 Blackjack : ${socket.pseudo} a ${playerTotal}, croupier a ${dealerTotal}. ${result}`);
}

function coinFlip(io, room, pseudo) {
  const result = Math.random() < 0.5 ? 'Pile' : 'Face';
  io.to(room).emit('botMessage', `🪙 ${pseudo} a lancé une pièce : ${result}`);
}

function rps(io, room, pseudo, choice) {
  const options = ['pierre', 'papier', 'ciseaux'];
  if (!options.includes(choice)) {
    io.to(room).emit('botMessage', `${pseudo}, choix invalide. Utilisez pierre, papier ou ciseaux.`);
    return;
  }
  const botChoice = options[Math.floor(Math.random() * options.length)];

  let result;
  if (choice === botChoice) result = 'Égalité !';
  else if (
    (choice === 'pierre' && botChoice === 'ciseaux') ||
    (choice === 'papier' && botChoice === 'pierre') ||
    (choice === 'ciseaux' && botChoice === 'papier')
  ) result = 'Vous gagnez !';
  else result = 'Vous perdez !';

  io.to(room).emit('botMessage', `✂️ ${pseudo} a choisi ${choice}, bot a choisi ${botChoice}. ${result}`);
}

function handleGameCommand(message, socket, io) {
  const [cmd, ...args] = message.trim().toLowerCase().split(' ');

  switch (cmd) {
    case '!dice': {
      const dice = rollDice();
      io.to(socket.room).emit('botMessage', `${socket.pseudo} a lancé un dé et obtenu : ${dice}`);
      return true;
    }
    case '!roll': {
      if (args.length !== 1 || !args[0].match(/^\d+d\d+$/)) {
        socket.emit('botMessage', 'Usage : !roll XdY (exemple : !roll 3d6)');
        return true;
      }
      const [count, sides] = args[0].split('d').map(Number);
      if (count > 20 || sides > 100) {
        socket.emit('botMessage', 'Limite : max 20 dés et 100 faces');
        return true;
      }
      const rolls = rollMultipleDice(count, sides);
      const total = rolls.reduce((a, b) => a + b, 0);
      io.to(socket.room).emit('botMessage', `${socket.pseudo} a lancé ${count}d${sides} : [${rolls.join(', ')}], total : ${total}`);
      return true;
    }
    case '!guessstart': {
      startGuessGame(io, socket.room);
      return true;
    }
    case '!guess': {
      const guess = parseInt(args[0], 10);
      const game = activeGames.get(socket.room);
      if (!game || game.type !== 'guess') {
        socket.emit('botMessage', 'Aucun jeu "Devine le nombre" en cours.');
        return true;
      }
      if (isNaN(guess)) {
        socket.emit('botMessage', 'Entrez un nombre valide.');
        return true;
      }
      game.attempts = (game.attempts || 0) + 1;
      if (guess === game.target) {
        io.to(socket.room).emit('botMessage', `🎉 ${socket.pseudo} a deviné le nombre ${guess} en ${game.attempts} essais !`);
        activeGames.delete(socket.room);
      } else if (guess < game.target) {
        socket.emit('botMessage', 'Plus grand !');
      } else {
        socket.emit('botMessage', 'Plus petit !');
      }
      return true;
    }
    case '!quiz': {
      startQuiz(io, socket.room);
      return true;
    }
    case '!answer': {
      const game = activeGames.get(socket.room);
      if (!game || game.type !== 'quiz') {
        socket.emit('botMessage', 'Aucun quiz en cours.');
        return true;
      }
      const answer = args.join(' ');
      if (answer.toLowerCase() === game.answer) {
        io.to(socket.room).emit('botMessage', `🎉 ${socket.pseudo} a répondu correctement !`);
        activeGames.delete(socket.room);
      } else {
        socket.emit('botMessage', 'Mauvaise réponse, essayez encore.');
      }
      return true;
    }
    case '!blackjack': {
      handleBlackjack(socket, io);
      return true;
    }
    case '!coinflip': {
      coinFlip(io, socket.room, socket.pseudo);
      return true;
    }
    case '!rps': {
      if (args.length === 0) {
        socket.emit('botMessage', 'Usage : !rps <pierre|papier|ciseaux>');
        return true;
      }
      rps(io, socket.room, socket.pseudo, args[0]);
      return true;
    }
    default:
      return false;
  }
}

module.exports = { handleGameCommand };