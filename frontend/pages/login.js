import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Stockage du token côté client (penser à sécuriser côté backend)
        localStorage.setItem('token', data.token);
        router.push(`/chat?pseudo=${encodeURIComponent(pseudo)}&room=general`);
      } else {
        setError(data.message || 'Erreur de connexion');
      }
    } catch {
      setError('Erreur réseau');
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm"
        aria-label="Formulaire de connexion"
      >
        <h2 className="text-xl mb-4 font-bold text-center">🔐 Connexion</h2>

        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          required
          aria-label="Pseudo"
          autoComplete="username"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          required
          aria-label="Mot de passe"
          autoComplete="current-password"
        />

        {error && <p className="text-red-400 mb-3 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded font-semibold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}