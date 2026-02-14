import { Crown } from 'lucide-react'
import type { ChatMember } from '@/types'
import { getUserById, currentUser } from '@/data/mock'
import Avatar from '@/components/shared/Avatar'

interface PodiumProps {
  members: ChatMember[]
}

export default function Podium({ members }: PodiumProps) {
  if (members.length < 3) return null

  const first = members[0]
  const second = members[1]
  const third = members[2]
  const firstUser = getUserById(first.userId)
  const secondUser = getUserById(second.userId)
  const thirdUser = getUserById(third.userId)

  const podiumItem = (member: ChatMember, user: ReturnType<typeof getUserById>, rank: number, height: string) => (
    <div className="flex flex-col items-center">
      <div className="relative mb-2">
        {rank === 1 && <Crown size={20} className="text-king-gold absolute -top-6 left-1/2 -translate-x-1/2" />}
        <Avatar
          letter={user?.avatar ?? '?'}
          size={rank === 1 ? 'lg' : 'md'}
          className={member.userId === currentUser.id ? 'ring-2 ring-brand ring-offset-2' : ''}
        />
      </div>
      <p className={`text-xs font-medium truncate max-w-[80px] ${
        member.userId === currentUser.id ? 'text-brand' : 'text-gray-900'
      }`}>
        {user?.name}
      </p>
      <p className="text-sm font-bold text-gray-900 mt-0.5">{member.points}</p>
      <div className={`mt-2 w-20 ${height} rounded-t-lg flex items-end justify-center pb-2 ${
        rank === 1 ? 'bg-brand' : rank === 2 ? 'bg-gray-300' : 'bg-orange-300'
      }`}>
        <span className="text-white font-bold text-lg">{rank}</span>
      </div>
    </div>
  )

  return (
    <div className="flex items-end justify-center gap-4 pt-10 pb-4">
      {podiumItem(second, secondUser, 2, 'h-20')}
      {podiumItem(first, firstUser, 1, 'h-28')}
      {podiumItem(third, thirdUser, 3, 'h-16')}
    </div>
  )
}
