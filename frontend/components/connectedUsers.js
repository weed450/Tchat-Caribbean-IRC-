import { useEffect, useState } from 'react';

export default function ConnectedUsers({ socket }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;
    socket.on('users', setUsers);
    return () => socket.off('users');
  }, [socket]);

  return (
    <div className="bg-gray-800 p-2 rounded mb-4 text-sm" aria-live="polite" aria-label="Liste des utilisateurs connectés">
      <h2 className="font-bold mb-2">Utilisateurs connectés :</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">Aucun utilisateur connecté</p>
      ) : (
        <ul className="space-y-1" role="list">
          {users.map((u) => (
            <li key={u} className="text-gray-300" role="listitem">
              {u}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}