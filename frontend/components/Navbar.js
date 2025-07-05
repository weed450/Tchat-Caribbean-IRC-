import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div className="font-bold">Tchat Caribbean</div>
      <div className="space-x-4">
        <Link href="/">Accueil</Link>
        <Link href="/chat">Chat</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}

