import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

export default function ChatPage() {
  const router = useRouter();
  const { pseudo } = router.query;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!pseudo) return;

    socket = io('http://localhost:3001'); // 🔁 adapte le port backend ici

    socket.emit('join', { pseudo });

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [pseudo]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const messageData = { author: pseudo, content: input };
    socket.emit('message', messageData);
    setInput('');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <header className="p-4 bg-blue-700 text-center text-2xl font-bold">
        Bienvenue {pseudo}
      </header>

      <main className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="bg-gray-800 p-2 rounded">
            <strong className="inline-flex items-center gap-1">
  <span>{msg.author}</span>
  {msg.badge?.verified && (
    <span
      className={`text-${msg.badge.color}-500 font-bold`}
      title="Vérifié"
    >
      {msg.badge.symbol}
    </span>
  )}
</strong>: {msg.content}
          </div>
        ))}
      </main>

      <form onSubmit={handleSend} className="p-4 flex bg-gray-800">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-700"
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
