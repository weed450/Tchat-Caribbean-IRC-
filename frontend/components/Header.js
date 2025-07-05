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
