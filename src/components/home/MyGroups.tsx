import { useNavigate } from 'react-router-dom'
import { Crown, Users, Zap } from 'lucide-react'
import type { Chat } from '@/types'
import { formatRelativeTime, getTotalPot } from '@/lib/utils'
import { currentUser, getUserById } from '@/data/mock'
import Card from '@/components/shared/Card'

interface MyGroupsProps {
  chats: Chat[]
}

export default function MyGroups({ chats }: MyGroupsProps) {
  const navigate = useNavigate()

  return (
    <div className="space-y-3">
      {chats.map(chat => {
        const king = chat.members.find(m => m.isKing)
        const kingUser = king ? getUserById(king.userId) : undefined
        const myMembership = chat.members.find(m => m.userId === currentUser.id)
        const hasActive = !!chat.activePrediction
        const pot = hasActive ? getTotalPot(chat.activePrediction!.options) : 0

        return (
          <Card key={chat.id} onClick={() => navigate(`/chat/${chat.id}`)}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center text-lg">
                  {chat.name.charAt(0)}
                </div>
                {hasActive && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand rounded-full flex items-center justify-center">
                    <Zap size={10} className="text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                  <span className="text-[10px] text-gray-400">{formatRelativeTime(chat.lastActivity)}</span>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  {kingUser && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Crown size={10} className="text-king-gold" />
                      {kingUser.name}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Users size={10} />
                    {chat.members.length}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-gray-900">{myMembership?.points ?? 0}</p>
                <p className="text-[10px] text-gray-400">pts</p>
                {hasActive && pot > 0 && (
                  <p className="text-[10px] text-brand font-medium mt-0.5">{pot} in pot</p>
                )}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
