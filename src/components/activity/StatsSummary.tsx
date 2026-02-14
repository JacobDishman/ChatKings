import { activityItems } from '@/data/mock'

export default function StatsSummary() {
  const resolved = activityItems.filter(a => a.result !== 'pending')
  const wins = resolved.filter(a => a.result === 'win').length
  const losses = resolved.filter(a => a.result === 'loss').length
  const winRate = resolved.length > 0 ? Math.round((wins / resolved.length) * 100) : 0
  const totalEarned = activityItems.filter(a => a.pointsChange > 0).reduce((s, a) => s + a.pointsChange, 0)
  const totalLost = activityItems.filter(a => a.pointsChange < 0).reduce((s, a) => s + Math.abs(a.pointsChange), 0)
  const net = totalEarned - totalLost

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <p className="text-xs text-gray-500 font-medium mb-1">Record</p>
        <p className="text-2xl font-bold text-gray-900">
          <span className="text-green-600">{wins}</span>
          <span className="text-gray-300">-</span>
          <span className="text-red-500">{losses}</span>
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{winRate}% win rate</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <p className="text-xs text-gray-500 font-medium mb-1">Net Points</p>
        <p className={`text-2xl font-bold ${net >= 0 ? 'text-green-600' : 'text-red-500'}`}>
          {net >= 0 ? '+' : ''}{net}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-green-600">+{totalEarned}</span>
          <span className="text-[10px] text-red-500">-{totalLost}</span>
        </div>
      </div>
    </div>
  )
}
