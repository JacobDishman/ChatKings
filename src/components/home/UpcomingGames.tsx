import type { Game } from '@/types'

const sportColors: Record<string, string> = {
  NFL: 'bg-blue-100 text-blue-700',
  NBA: 'bg-orange-100 text-orange-700',
  NCAAF: 'bg-red-100 text-red-700',
  MLB: 'bg-green-100 text-green-700',
  NHL: 'bg-gray-100 text-gray-700',
}

interface UpcomingGamesProps {
  games: Game[]
}

export default function UpcomingGames({ games }: UpcomingGamesProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {games.map(game => (
        <div key={game.id} className="bg-white rounded-xl shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sportColors[game.sport]}`}>
              {game.sport}
            </span>
            <span className="text-[10px] text-gray-500 font-medium">{game.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-white text-[8px] font-bold"
              style={{ backgroundColor: game.teamA.color }}
            >
              {game.teamA.abbr}
            </div>
            <span className="text-xs text-gray-400 font-medium">vs</span>
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-white text-[8px] font-bold"
              style={{ backgroundColor: game.teamB.color }}
            >
              {game.teamB.abbr}
            </div>
          </div>
          <p className="text-[10px] text-gray-500 mt-1.5 truncate">
            {game.teamA.name} vs {game.teamB.name}
          </p>
        </div>
      ))}
    </div>
  )
}
