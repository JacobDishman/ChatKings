import { useParams } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { getChatById } from '@/data/mock'
import PageHeader from '@/components/shared/PageHeader'
import Podium from '@/components/leaderboard/Podium'
import RankingList from '@/components/leaderboard/RankingList'

export default function LeaderboardPage() {
  const { id } = useParams<{ id: string }>()
  const chat = getChatById(id!)

  if (!chat) {
    return <div className="p-8 text-center text-gray-500">Chat not found</div>
  }

  const sorted = [...chat.members].sort((a, b) => b.points - a.points)

  return (
    <div className="pb-4">
      <PageHeader title="Leaderboard" backTo={`/chat/${id}`} subtitle={chat.name} />

      <div className="mx-4 mt-3 mb-2 flex items-center gap-2 text-xs text-gray-500 bg-gray-100 rounded-lg px-3 py-2">
        <Clock size={12} />
        <span>Weekly reset in 4 days</span>
      </div>

      {sorted.length >= 3 && <Podium members={sorted} />}

      <RankingList members={sorted} />
    </div>
  )
}
