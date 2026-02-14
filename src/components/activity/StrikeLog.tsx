import { Shield } from 'lucide-react'
import { strikeLog } from '@/data/mock'
import { formatDate } from '@/lib/utils'

export default function StrikeLog() {
  const colorMap: Record<number, string> = {
    0: 'text-green-500',
    1: 'text-yellow-500',
    2: 'text-orange-500',
    3: 'text-red-500',
  }

  const bgMap: Record<number, string> = {
    0: 'bg-green-50 border-green-200',
    1: 'bg-yellow-50 border-yellow-200',
    2: 'bg-orange-50 border-orange-200',
    3: 'bg-red-50 border-red-200',
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-900">Strike Log</h3>
      {strikeLog.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">No strikes yet — keep it up!</p>
      ) : (
        strikeLog.map(entry => (
          <div key={entry.id} className={`border rounded-xl p-3 ${bgMap[entry.strikeCount] ?? bgMap[0]}`}>
            <div className="flex items-center gap-3">
              <Shield size={16} className={colorMap[entry.strikeCount] ?? colorMap[0]} />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{entry.reason}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{formatDate(entry.date)}</p>
              </div>
              <span className="text-xs font-bold text-gray-500">{entry.strikeCount}/3</span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
