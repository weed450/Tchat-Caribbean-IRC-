import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/chat', label: 'Chat' },
    { href: '/admin', label: 'Admin' },
    { href: '/login', label: 'Login' },
  ];

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="font-bold text-lg">Tchat Caribbean</div>
      <div className="space-x-6">
        {links.map(({ href, label }) => {
          const isActive = router.pathname === href;
          return (
            <Link key={href} href={href} aria-current={isActive ? 'page' : undefined}>
              <a
                className={`hover:underline ${
                  isActive ? 'underline font-semibold text-blue-400' : ''
                }`}
              >
                {label}
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}