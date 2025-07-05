export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <form className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4 text-center">Connexion</h1>
        <input
          type="text"
          placeholder="Pseudo"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 hover:bg-blue-500 rounded"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}