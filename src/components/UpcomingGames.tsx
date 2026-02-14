import { games } from '../data/mock';

export default function UpcomingGames() {
  const upcoming = games.filter((g) => !g.live);

  return (
    <section className="px-4 pt-5 pb-6">
      <h2 className="text-lg font-bold mb-3">Upcoming</h2>
      <div className="grid grid-cols-2 gap-3">
        {upcoming.map((game) => (
          <div
            key={game.id}
            className="bg-surface rounded-xl p-3 border border-surface-lighter"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-surface-lighter px-1.5 py-0.5 rounded">
                {game.sport}
              </span>
              <span className="text-[10px] text-gray-500">{game.time}</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-6 h-6 rounded flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: game.teamA.color }}
                >
                  {game.teamA.abbreviation}
                </span>
                <span className="text-xs font-medium truncate">{game.teamA.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-6 h-6 rounded flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: game.teamB.color }}
                >
                  {game.teamB.abbreviation}
                </span>
                <span className="text-xs font-medium truncate">{game.teamB.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
