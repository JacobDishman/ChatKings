import { TrendingUp, TrendingDown, Clock, Shield } from 'lucide-react';
import { activityItems, strikeLog } from '../data/mock';

export default function ActivityPage() {
  const wins = activityItems.filter((a) => a.result === 'won').length;
  const losses = activityItems.filter((a) => a.result === 'lost').length;
  const total = wins + losses;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;
  const netPoints = activityItems.reduce((s, a) => s + a.pointsChange, 0);
  const totalEarned = activityItems.filter((a) => a.pointsChange > 0).reduce((s, a) => s + a.pointsChange, 0);
  const totalLost = activityItems.filter((a) => a.pointsChange < 0).reduce((s, a) => s + a.pointsChange, 0);

  return (
    <div className="px-4 py-4">
      <h1 className="text-lg font-bold mb-4">My Activity</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-surface rounded-xl border border-surface-lighter p-4">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Record</span>
          <div className="mt-1">
            <span className="text-xl font-bold">
              <span className="text-green-400">{wins}</span>
              <span className="text-gray-500">-</span>
              <span className="text-red-400">{losses}</span>
            </span>
          </div>
          <span className="text-xs text-gray-400">{winRate}% win rate</span>
        </div>
        <div className="bg-surface rounded-xl border border-surface-lighter p-4">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Net Points</span>
          <div className="mt-1">
            <span className={`text-xl font-bold ${netPoints >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {netPoints >= 0 ? '+' : ''}{netPoints}
            </span>
          </div>
          <div className="flex gap-2 text-[10px]">
            <span className="text-green-400">+{totalEarned}</span>
            <span className="text-red-400">{totalLost}</span>
          </div>
        </div>
      </div>

      {/* Recent Predictions */}
      <h2 className="text-sm font-bold mb-3 text-gray-300">Recent Predictions</h2>
      <div className="space-y-2 mb-6">
        {activityItems.map((item) => {
          const borderColor =
            item.result === 'won'
              ? 'border-l-green-500 bg-green-900/10'
              : item.result === 'lost'
              ? 'border-l-red-500 bg-red-900/10'
              : 'border-l-gray-500 bg-surface';
          const Icon = item.result === 'won' ? TrendingUp : item.result === 'lost' ? TrendingDown : Clock;
          const iconColor =
            item.result === 'won' ? 'text-green-400' : item.result === 'lost' ? 'text-red-400' : 'text-gray-400';

          return (
            <div
              key={item.id}
              className={`rounded-lg border border-surface-lighter border-l-4 ${borderColor} p-3`}
            >
              <div className="flex items-start gap-2">
                <Icon size={16} className={`${iconColor} mt-0.5 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.question}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                    <span>{item.chatName}</span>
                    <span>·</span>
                    <span>Picked: {item.yourPick}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span
                    className={`text-sm font-bold ${
                      item.pointsChange > 0
                        ? 'text-green-400'
                        : item.pointsChange < 0
                        ? 'text-red-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {item.pointsChange > 0 ? '+' : ''}{item.pointsChange || '—'}
                  </span>
                  <span className="block text-[10px] text-gray-500">{item.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Strike Log */}
      <h2 className="text-sm font-bold mb-3 text-gray-300">Strike Log</h2>
      <div className="space-y-2 pb-4">
        {strikeLog.map((entry) => {
          const color =
            entry.strikes === 0
              ? 'text-green-400'
              : entry.strikes === 1
              ? 'text-yellow-400'
              : entry.strikes >= 2
              ? 'text-red-400'
              : 'text-gray-400';

          return (
            <div
              key={entry.id}
              className="flex items-center gap-3 bg-surface rounded-lg border border-surface-lighter p-3"
            >
              <Shield size={16} className={color} />
              <div className="flex-1">
                <span className="text-sm">{entry.reason}</span>
                <span className="block text-[10px] text-gray-500">{entry.date}</span>
              </div>
              <span className={`text-xs font-bold ${color}`}>{entry.strikes}/3</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
