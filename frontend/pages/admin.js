import { useState } from 'react';

export default function AdminPage() {
  const [pseudo, setPseudo] = useState('');
  const [color, setColor] = useState('gold');
  const [role, setRole] = useState('user');
  const [xp, setXp] = useState(0);
  const [gems, setGems] = useState(0);
  const [logs, setLogs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState('');

  const handleBadge = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/admin/badge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo, color }),
    });
    const data = await res.json();
    setMessage(res.ok ? `✅ Badge "${color}" assigné à ${pseudo}` : `❌ ${data.message || 'Erreur'}`);
  };

  const handleRoleChange = async () => {
    const res = await fetch('http://localhost:5000/admin/role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo, role }),
    });
    const data = await res.json();
    setMessage(res.ok ? `✅ Rôle "${role}" assigné à ${pseudo}` : `❌ ${data.message || 'Erreur'}`);
  };

  const handleVerification = async () => {
    const res = await fetch('http://localhost:5000/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo }),
    });
    const data = await res.json();
    setMessage(res.ok ? `✅ Utilisateur ${pseudo} vérifié` : `❌ ${data.message || 'Erreur'}`);
  };

  const handleStatsUpdate = async () => {
    const res = await fetch('http://localhost:5000/admin/update-stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo, xp: parseInt(xp), gems: parseInt(gems) }),
    });
    const data = await res.json();
    setMessage(res.ok ? '✅ Stats mises à jour' : `❌ ${data.message}`);
  };

  const fetchUser = async () => {
    const res = await fetch(`http://localhost:5000/admin/user/${pseudo}`);
    const data = await res.json();
    if (res.ok) {
      setUserInfo(data.user);
      setMessage('');
    } else {
      setUserInfo(null);
      setMessage(`❌ ${data.message || 'Utilisateur introuvable'}`);
    }
  };

  const fetchLogs = async () => {
    const res = await fetch(`http://localhost:5000/admin/logs/${pseudo}`);
    const data = await res.json();
    if (res.ok) setLogs(data.logs);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🛠️ Panneau d’administration</h1>

      <input
        type="text"
        placeholder="Pseudo à gérer"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
        className="p-2 mb-4 rounded bg-gray-700 w-full max-w-md"
      />

      {message && <div className="mb-4 text-sm text-yellow-300">{message}</div>}

      <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
        <form onSubmit={handleBadge}>
          <h2 className="font-semibold mb-2">🎖️ Assigner badge</h2>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="p-2 mb-2 bg-gray-700 rounded w-full"
          >
            <option value="gold">Propriétaire</option>
            <option value="green">Admin</option>
            <option value="blue">Vérifié</option>
            <option value="pink">Supporter</option>
            <option value="red">Modérateur</option>
            <option value="black">Bot</option>
          </select>
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 p-2 rounded w-full">
            ✅ Assigner Badge
          </button>
        </form>

        <div>
          <h2 className="font-semibold mb-2">🔐 Changer rôle</h2>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 mb-2 bg-gray-700 rounded w-full"
          >
            <option value="user">Utilisateur</option>
            <option value="modo">Modérateur</option>
            <option value="admin">Admin</option>
            <option value="owner">Propriétaire</option>
            <option value="bot">Bot</option>
          </select>
          <button onClick={handleRoleChange} className="bg-green-600 hover:bg-green-500 p-2 rounded w-full">
            🔁 Modifier rôle
          </button>
        </div>
      </div>

      <div className="mt-6 max-w-md space-y-2">
        <button onClick={handleVerification} className="w-full p-2 bg-indigo-600 rounded hover:bg-indigo-500">
          ✅ Vérifier utilisateur
        </button>
        <button onClick={fetchUser} className="w-full p-2 bg-gray-700 rounded hover:bg-gray-600">
          🔍 Voir infos utilisateur
        </button>

        {userInfo && (
          <div className="mt-4 bg-gray-800 p-4 rounded">
            <p><strong>XP:</strong> {userInfo.xp}</p>
            <p><strong>Niveau:</strong> {userInfo.level}</p>
            <p><strong>Gems:</strong> {userInfo.gems}</p>
            <p><strong>Rôle:</strong> {userInfo.role}</p>
            <p><strong>Badges:</strong> {userInfo.badges.join(', ') || 'Aucun'}</p>
            <p><strong>Vérifié:</strong> {userInfo.isVerified ? '✅ Oui' : '❌ Non'}</p>
          </div>
        )}

        {/* Modifier XP & Gems */}
        <div className="mt-6">
          <h2 className="font-semibold">📈 Modifier XP / Gems</h2>
          <input
            type="number"
            placeholder="+XP"
            value={xp}
            onChange={(e) => setXp(e.target.value)}
            className="p-2 rounded bg-gray-700 w-full mt-2"
          />
          <input
            type="number"
            placeholder="+Gems"
            value={gems}
            onChange={(e) => setGems(e.target.value)}
            className="p-2 rounded bg-gray-700 w-full mt-2"
          />
          <button onClick={handleStatsUpdate} className="w-full bg-yellow-600 hover:bg-yellow-500 p-2 rounded mt-2">
            ✅ Mettre à jour
          </button>
        </div>

        {/* Logs messages */}
        <button onClick={fetchLogs} className="bg-gray-800 mt-4 p-2 rounded w-full">
          📜 Voir derniers messages
        </button>

        {logs.length > 0 && (
          <div className="bg-black mt-4 p-4 rounded max-h-60 overflow-y-auto text-sm">
            {logs.map((log, i) => (
              <p key={i}>
                <strong>{log.timestamp?.slice(0, 19).replace('T', ' ')}</strong> : {log.content}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}