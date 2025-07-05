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
    <div className="mb-4 p-2 bg-gray-800 rounded">
      <h2 className="text-sm font-bold mb-2">Légende des badges :</h2>
      <ul className="text-sm space-y-1">
        {badges.map((badge, idx) => (
          <li key={idx}>
            <span className={`font-bold ${badge.color}`}>{badge.symbol}</span> - {badge.label}
          </li>
        ))}
      </ul>
    </div>
  );
    }
