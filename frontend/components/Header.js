import Link from 'next/link';

export default function Header() {
  return (
    <nav className="bg-blue-900 text-white p-4 flex gap-4 justify-center">
      <Link href="/">Accueil</Link>
      <Link href="/chat">Salon</Link>
      <Link href="/admin">Admin</Link>
      <Link href="/login">Connexion</Link>
    </nav>
  );
}
<header className="bg-blue-700 p-4 text-center text-2xl font-bold">
  {`Salon #${room} | Bienvenue ${pseudo}`}
</header>