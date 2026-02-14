import type { Game } from '@/types'

const sportColors: Record<string, string> = {
  NFL: 'bg-blue-100 text-blue-700',
  NBA: 'bg-orange-100 text-orange-700',
  NCAAF: 'bg-red-100 text-red-700',
  MLB: 'bg-green-100 text-green-700',
  NHL: 'bg-gray-100 text-gray-700',
}

interface LiveGamesProps {
  games: Game[]
}

export default function LiveGames({ games }: LiveGamesProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
      {games.map(game => (
        <div
          key={game.id}
          className="snap-start min-w-[260px] flex-shrink-0 bg-white rounded-xl shadow-sm p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sportColors[game.sport]}`}>
              {game.sport}
            </span>
            {game.live && (
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-red-500">LIVE</span>
              </div>
            )}
            {!game.live && (
              <span className="text-[10px] text-gray-500 font-medium">{game.time}</span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded flex items-center justify-center text-white text-[10px] font-bold"
                style={{ backgroundColor: game.teamA.color }}
              >
                {game.teamA.abbr}
              </div>
              <span className="flex-1 text-sm font-medium text-gray-900">{game.teamA.name}</span>
              {game.live && game.scores && (
                <span className="text-lg font-bold text-gray-900">{game.scores.teamA}</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded flex items-center justify-center text-white text-[10px] font-bold"
                style={{ backgroundColor: game.teamB.color }}
              >
                {game.teamB.abbr}
              </div>
              <span className="flex-1 text-sm font-medium text-gray-900">{game.teamB.name}</span>
              {game.live && game.scores && (
                <span className="text-lg font-bold text-gray-900">{game.scores.teamB}</span>
              )}
            </div>
          </div>

          {game.live && game.scores?.quarter && (
            <p className="text-[10px] text-gray-500 text-center mt-2 font-medium">{game.scores.quarter}</p>
          )}
        </div>
      ))}
    </div>
  )
}
