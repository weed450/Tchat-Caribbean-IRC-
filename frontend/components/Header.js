import Header from '../components/Header';
import Link from 'next/link';

const salons = ['general', 'ados', 'jeux', 'staff', 'admin'];

export default function Header() {
  return (<div className="h-screen flex flex-col bg-gray-900 text-white">
  <Header />
  <header className="bg-blue-700 p-4 text-center text-2xl font-bold">
    {`Salon #${room} | Bienvenue ${pseudo}`}
  </header>
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
      <Link href="/login">🔐 Connexion</Link>
    </nav>
  );
}