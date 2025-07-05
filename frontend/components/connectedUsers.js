import { useEffect, useState } from 'react';

export default function ConnectedUsers({ socket }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;
    socket.on('users', setUsers);
    return () => socket.off('users');
  }, [socket]);

  return (
    <div className="bg-gray-800 p-2 rounded mb-4 text-sm">
      <h2 className="font-bold mb-2">Utilisateurs connectés :</h2>
      <ul className="space-y-1">
        {users.map((u, i) => (
          <li key={i} className="text-gray-300">{u}</li>
        ))}
      </ul>
    </div>
  );
}