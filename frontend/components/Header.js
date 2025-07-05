// components/Header.js
import Link from 'next/link';

const salons = ['general', 'ados', 'jeux', 'staff', 'admin'];

export default function HeaderNav() {
  return (
    <nav className="bg-blue-900 text-white p-4 flex flex-wrap gap-4 justify-center text-sm sm:text-base">
      <Link href="/">🏠 Accueil</Link>
      {salons.map((room) => (
        <Link
          key={room}
          href={`/chat?pseudo=Invite&room=${room}`}
          className="hover:underline"
        >
          #{room}
        </Link>
      ))}
      <Link href="/join">➕ Rejoindre</Link>
      <Link href="/login">🔐 Connexion</Link>
    </nav>
  );
}