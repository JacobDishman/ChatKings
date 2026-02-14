import { TrendingUp, TrendingDown, Clock } from 'lucide-react'
import { activityItems } from '@/data/mock'
import { formatDate } from '@/lib/utils'

export default function PredictionHistory() {
  const resultConfig = {
    win: { icon: TrendingUp, color: 'border-green-200 bg-green-50', textColor: 'text-green-600', iconColor: 'text-green-500' },
    loss: { icon: TrendingDown, color: 'border-red-200 bg-red-50', textColor: 'text-red-500', iconColor: 'text-red-500' },
    pending: { icon: Clock, color: 'border-gray-200 bg-gray-50', textColor: 'text-gray-500', iconColor: 'text-gray-400' },
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-900">Recent Predictions</h3>
      {activityItems.map(item => {
        const config = resultConfig[item.result]
        const Icon = config.icon

        return (
          <div key={item.id} className={`border rounded-xl p-3 ${config.color}`}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Icon size={16} className={config.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{item.question}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.chatName}</p>
                <p className="text-xs text-gray-500">Picked: {item.yourPick}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-bold ${config.textColor}`}>
                  {item.pointsChange > 0 ? '+' : ''}{item.pointsChange || '-'}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">{formatDate(item.date)}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
