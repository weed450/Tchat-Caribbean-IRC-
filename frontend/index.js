import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [pseudo, setPseudo] = useState('');
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/chat?pseudo=${pseudo}`);
  };
  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>Chat Caribbean - Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input value={pseudo} onChange={e => setPseudo(e.target.value)} placeholder="Entrez votre pseudo" />
        <button type="submit">Entrer</button>
      </form>
    </div>
  );
}