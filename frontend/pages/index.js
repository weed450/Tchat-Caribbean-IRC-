import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [pseudo, setPseudo] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pseudo.trim() === '') return;
    router.push(`/chat?pseudo=${encodeURIComponent(pseudo)}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm"
        aria-label="Formulaire de saisie du pseudo"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Tchat Caribbean IRC</h1>

        <label htmlFor="pseudo" className="sr-only">
          Pseudo
        </label>
        <input
          id="pseudo"
          type="text"
          placeholder="Entrez votre pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400"
          required
          aria-label="Pseudo"
          autoComplete="username"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold disabled:opacity-50"
          disabled={!pseudo.trim()}
        >
          Entrer
        </button>
      </form>
    </div>
  );
}