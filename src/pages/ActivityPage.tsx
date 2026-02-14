import StatsSummary from '@/components/activity/StatsSummary'
import PredictionHistory from '@/components/activity/PredictionHistory'
import StrikeLog from '@/components/activity/StrikeLog'

export default function ActivityPage() {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Activity</h2>
      <StatsSummary />
      <PredictionHistory />
      <StrikeLog />
    </div>
  )
}
