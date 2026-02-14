import { games } from '../data/mock';

export default function LiveGames() {
  const liveCount = games.filter((g) => g.live).length;

  return (
    <section className="px-4 pt-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">Live & Upcoming</h2>
        {liveCount > 0 && (
          <span className="text-xs text-red-400 font-medium flex items-center gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            {liveCount} live
          </span>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-thin">
        {games.map((game) => (
          <div
            key={game.id}
            className="flex-shrink-0 w-52 bg-surface rounded-xl p-3 border border-surface-lighter"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-surface-lighter px-2 py-0.5 rounded">
                {game.sport}
              </span>
              {game.live ? (
                <span className="text-[10px] font-bold text-red-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  LIVE
                </span>
              ) : (
                <span className="text-[10px] text-gray-500">{game.time}</span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: game.teamA.color }}
                  >
                    {game.teamA.abbreviation}
                  </span>
                  <span className="text-sm font-medium truncate max-w-[80px]">{game.teamA.name}</span>
                </div>
                {game.live && game.scores && (
                  <span className="text-sm font-bold">{game.scores.teamA}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: game.teamB.color }}
                  >
                    {game.teamB.abbreviation}
                  </span>
                  <span className="text-sm font-medium truncate max-w-[80px]">{game.teamB.name}</span>
                </div>
                {game.live && game.scores && (
                  <span className="text-sm font-bold">{game.scores.teamB}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
