}// Page d'accueil (pseudo)
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [pseudo, setPseudo] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pseudo.trim() === '') return
    router.push(`/chat?pseudo=${encodeURIComponent(pseudo)}`)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Tchat Caribbean IRC</h1>
        <input
          type="text"
          placeholder="Entrez votre pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          Entrer
        </button>
      </form>
    </div>
  )
