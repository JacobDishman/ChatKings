import { Crown } from 'lucide-react'
import type { ChatMember } from '@/types'
import { getUserById, currentUser } from '@/data/mock'
import Avatar from '@/components/shared/Avatar'
import StrikeBadge from '@/components/layout/StrikeBadge'

interface RankingListProps {
  members: ChatMember[]
}

export default function RankingList({ members }: RankingListProps) {
  const rankColors: Record<number, string> = {
    1: 'bg-king-gold text-white',
    2: 'bg-gray-400 text-white',
    3: 'bg-orange-400 text-white',
  }

  return (
    <div className="space-y-2 px-4">
      {members.map((member, i) => {
        const rank = i + 1
        const user = getUserById(member.userId)
        const isMe = member.userId === currentUser.id

        return (
          <div
            key={member.userId}
            className={`flex items-center gap-3 p-3 rounded-xl ${
              isMe ? 'bg-brand/5 border border-brand/20' : 'bg-white'
            }`}
          >
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              rankColors[rank] ?? 'bg-gray-200 text-gray-600'
            }`}>
              {rank}
            </span>

            <Avatar letter={user?.avatar ?? '?'} size="sm" />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className={`text-sm font-medium truncate ${isMe ? 'text-brand' : 'text-gray-900'}`}>
                  {user?.name}{isMe ? ' (You)' : ''}
                </span>
                {member.isKing && <Crown size={12} className="text-king-gold shrink-0" />}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                {member.minorityWins > 0 && (
                  <span className="text-[10px] text-brand font-medium">{member.minorityWins} minority wins</span>
                )}
                {user && <StrikeBadge strikes={user.strikes} size="sm" />}
              </div>
            </div>

            <span className="text-sm font-bold text-gray-900 shrink-0">{member.points}</span>
          </div>
        )
      })}
    </div>
  )
}
