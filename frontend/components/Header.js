// components/Header.js
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const salons = ['general', 'ados', 'jeux', 'staff', 'admin'];

export default function HeaderNav() {
  const router = useRouter();
  const [pseudo, setPseudo] = useState('Invite');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user?.pseudo) setPseudo(user.pseudo);
      } catch (e) {}
    }
  }, []);

  const isActive = (href) => router.pathname === href;

  return (
    <nav
      className="bg-blue-900 text-white p-4 flex flex-wrap items-center gap-4 justify-center text-sm sm:text-base"
      aria-label="Navigation principale"
    >
      {/* Accueil */}
      <Link href="/" passHref>
        <a
          className={`hover:underline ${
            isActive('/') ? 'underline font-semibold text-yellow-300' : ''
          }`}
        >
          🏠 Accueil
        </a>
      </Link>

      {/* Liens vers les salons */}
      {salons.map((room) => (
        <Link
          key={room}
          href={`/chat?pseudo=${encodeURIComponent(pseudo)}&room=${room}`}
          passHref
        >
          <a className="hover:underline">#{room}</a>
        </Link>
      ))}

      {/* Rejoindre + Login */}
      <Link href="/join" passHref>
        <a
          className={`hover:underline ${
            isActive('/join') ? 'underline font-semibold text-yellow-300' : ''
          }`}
        >
          ➕ Rejoindre
        </a>
      </Link>

      <Link href="/login" passHref>
        <a
          className={`hover:underline ${
            isActive('/login') ? 'underline font-semibold text-yellow-300' : ''
          }`}
        >
          🔐 Connexion
        </a>
      </Link>
    </nav>
  );
}