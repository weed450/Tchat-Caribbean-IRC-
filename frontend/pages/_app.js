// pages/_app.js
import '../styles/globals.css';
import { createContext, useState, useEffect } from 'react';

// Exemple simple de contexte Auth (tu peux l'adapter selon ton backend)
export const AuthContext = createContext();

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  // Exemple : récupération utilisateur depuis localStorage au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* Layout commun simple */}
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <header className="bg-blue-800 p-4 text-center font-bold text-xl">
          Tchat Caribbean IRC - Administration
        </header>

        <main className="flex-grow container mx-auto px-4 py-6">
          <Component {...pageProps} />
        </main>

        <footer className="bg-blue-800 p-4 text-center text-sm">
          &copy; 2025 Tchat Caribbean IRC. Tous droits réservés.
        </footer>
      </div>
    </AuthContext.Provider>
  );
}