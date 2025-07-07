export default function BadgeLegend() {
  const badges = [
    { color: 'text-yellow-400', symbol: '@', label: 'Propriétaire' },
    { color: 'text-green-400', symbol: '@', label: 'Admin' },
    { color: 'text-blue-400', symbol: '+', label: 'Vérifié' },
    { color: 'text-pink-400', symbol: '✓', label: 'Supporter' },
    { color: 'text-red-500', symbol: '@', label: 'Modérateur' },
    { color: 'text-gray-800', symbol: '✓', label: 'Bot officiel' },
  ];

  return (
    <div className="mb-4 p-4 bg-gray-800 rounded shadow-md" aria-label="Légende des badges">
      <h2 className="text-sm font-bold mb-3 border-b border-gray-600 pb-1">Légende des badges :</h2>
      <ul className="grid sm:grid-cols-2 gap-2 text-sm">
        {badges.map((badge, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <span className={`font-bold ${badge.color}`}>{badge.symbol}</span>
            <span>{badge.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}