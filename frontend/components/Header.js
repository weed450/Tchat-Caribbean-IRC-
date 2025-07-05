import Link from 'next/link';

const salons = ['general', 'ados', 'jeux', 'staff', 'admin'];

export default function HeaderNav() {
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
  <HeaderNav />
  <header className="bg-blue-700 p-4 text-center text-2xl font-bold">
    {`Salon #${room} | Bienvenue ${pseudo}`}
  </header>
  {/* ... le reste du chat */}
</div>
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