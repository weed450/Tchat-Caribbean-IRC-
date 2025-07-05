import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Connexion réussie !');
        router.push(`/chat?pseudo=${pseudo}`);
      } else {
        alert(data.message || 'Erreur de connexion');
      }
    } catch (err) {
      alert('Erreur réseau');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4 font-bold">Connexion</h2>
        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded">
          Se connecter
        </button>
      </form>
    </div>
  );
}