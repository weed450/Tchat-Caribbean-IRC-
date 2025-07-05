import { useState } from 'react';

export default function AdminPage() {
  const [pseudo, setPseudo] = useState('');
  const [color, setColor] = useState('gold');

  const handleBadge = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/admin/badge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo, color }),
    });
    alert('Badge assigné');
  };

  return (
    <div className="p-4 bg-gray-900 text-white h-screen">
      <h1 className="text-2xl font-bold mb-4">🎖️ Panneau Admin - Badges</h1>
      <form onSubmit={handleBadge} className="space-y-4">
        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="p-2 rounded bg-gray-700 w-full"
        />
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="p-2 rounded bg-gray-700 w-full"
        >
          <option value="gold">Propriétaire</option>
          <option value="green">Admin</option>
          <option value="blue">Vérifié</option>
          <option value="pink">Supporter</option>
          <option value="red">Modérateur</option>
          <option value="black">Bot</option>
        </select>
        <button className="p-2 bg-blue-600 rounded hover:bg-blue-500">
          Assigner Badge
        </button>
      </form>
    </div>
  );
}