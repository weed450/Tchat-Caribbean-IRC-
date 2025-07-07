import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

import BadgeLegend from '../components/BadgeLegend';
import ConnectedUsers from '../components/ConnectedUsers';
import HeaderNav from '../components/Header';

let socket;

export default function ChatPage() {
  const router = useRouter();
  const { pseudo, room = 'general' } = router.query;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [socketInstance, setSocketInstance] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!pseudo || !room) return;

    // Init socket avec variable d'environnement
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000');
    setSocketInstance(socket);

    socket.emit('join', { pseudo, room });

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('botMessage', (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`, // id unique généré
          author: 'XPBot',
          content: msg,
          badge: {
            verified: true,
            color: 'green',
            symbol: '✓',
          },
        },
      ]);
    });

    socket.on('connect_error', () => {
      alert('Erreur de connexion au serveur de chat');
    });

    socket.on('disconnect', () => {
      alert('Déconnecté du serveur de chat');
    });

    return () => {
      socket.disconnect();
    };
  }, [pseudo, room]);

  // Scroll automatique à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageData = { author: pseudo, content: input, room };
    socket.emit('message', messageData);
    setInput('');
  };

  const renderBadge = (badge) => {
    if (!badge?.verified) return null;

    const badgeColors = {
      gold: 'text-yellow-400',
      blue: 'text-blue-400',
      green: 'text-green-400',
      pink: 'text-pink-400',
      red: 'text-red-500',
      black: 'text-gray-800',
    };

    const colorClass = badgeColors[badge.color] || 'text-white';

    return (
      <span className={`ml-1 font-bold ${colorClass}`} aria-label="badge">
        {badge.symbol}
      </span>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <HeaderNav />
      <header className="bg-blue-700 p-4 text-center text-2xl font-bold">
        {`Salon #${room} | Bienvenue ${pseudo}`}
      </header>

      <main className="flex-1 p-4 overflow-y-auto space-y-2">
        {socketInstance && <ConnectedUsers socket={socketInstance} />}
        <BadgeLegend />

        {messages.map((msg, idx) => (
          <div key={msg.id || idx} className="bg-gray-800 p-2 rounded">
            <strong className="text-white">
              {msg.author}
              {renderBadge(msg.badge)}:
            </strong>{' '}
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <form onSubmit={handleSend} className="p-4 flex bg-gray-800">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-700 text-white"
          placeholder="Message"
          aria-label="Message à envoyer"
          autoComplete="off"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
          aria-label="Envoyer message"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}