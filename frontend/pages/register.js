// pages/register.js

import { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({
    pseudo: '',
    email: '',
    genre: 'F',
    password: '',
    confirmPassword: '',
    birthdate: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis', form);
    // TODO: Ajouter logique d’inscription ici (API)
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-lg w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">Créez votre compte</h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          Vous avez déjà un compte ? <a href="/login" className="text-blue-400 underline">Connectez-vous ici</a>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Pseudo</label>
            <input
              type="text"
              name="pseudo"
              value={form.pseudo}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 rounded bg-gray-700"
              placeholder="Entrez votre pseudo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date de naissance</label>
            <input
              type="date"
              name="birthdate"
              value={form.birthdate}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 rounded bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Sexe</label>
            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded bg-gray-700"
            >
              <option value="F">Femme</option>
              <option value="M">Homme</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 rounded bg-gray-700"
              placeholder="email@exemple.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 rounded bg-gray-700"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 rounded bg-gray-700"
              placeholder="••••••••"
            />
          </div>
          <div className="text-sm text-center">
            En créant votre compte, vous acceptez nos <a href="/conditions" className="underline text-blue-400">CGU</a>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold">
            Créer un compte
          </button>
        </form>
      </div>
    </div>
  );
}