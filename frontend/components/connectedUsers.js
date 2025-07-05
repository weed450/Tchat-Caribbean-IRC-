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
// frontend/components/ConnectedUsers.js
export default function ConnectedUsers({ users }) {
  return (
    <div className="p-4 bg-gray-800 rounded mb-4">
      <h2 className="text-sm font-bold mb-2">Utilisateurs connectés :</h2>
      <ul className="text-sm">
        {users.map((user, idx) => (
          <li key={idx}>{user}</li>
        ))}
      </ul>
    </div>
  );
}
