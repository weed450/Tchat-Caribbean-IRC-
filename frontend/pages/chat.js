import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (!pseudo || !room) return;

    socket = io('http://localhost:5000');
    setSocketInstance(socket);

    socket.emit('join', { pseudo, room });

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('botMessage', (msg) => {
      setMessages((prev) => [
        ...prev,
        {
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

    return () => {
      socket.disconnect();
    };
  }, [pseudo, room]);

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
      <span className={`ml-1 font-bold ${colorClass}`}>
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
          <div key={idx} className="bg-gray-800 p-2 rounded">
            <strong className="text-white">
              {msg.author}
              {renderBadge(msg.badge)}:
            </strong>{' '}
            {msg.content}
          </div>
        ))}
      </main>

      <form onSubmit={handleSend} className="p-4 flex bg-gray-800">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-700 text-white"
          placeholder="Message"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}