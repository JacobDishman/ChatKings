import { Zap } from 'lucide-react'
import type { Message } from '@/types'
import { currentUser, getUserById } from '@/data/mock'
import { formatTime } from '@/lib/utils'
import Avatar from '@/components/shared/Avatar'

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  if (message.type === 'system') {
    return (
      <div className="flex justify-center">
        <p className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 italic">
          {message.text}
        </p>
      </div>
    )
  }

  if (message.type === 'prediction') {
    return (
      <div className="flex justify-center">
        <div className="flex items-center gap-2 bg-brand/5 border border-brand/20 rounded-lg px-3 py-2">
          <Zap size={14} className="text-brand shrink-0" />
          <p className="text-xs text-brand font-medium">{message.text}</p>
        </div>
      </div>
    )
  }

  const isOwn = message.userId === currentUser.id
  const user = getUserById(message.userId)

  if (isOwn) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%]">
          <div className="bg-brand text-white rounded-2xl rounded-br-sm px-3 py-2">
            <p className="text-sm">{message.text}</p>
          </div>
          <p className="text-[10px] text-gray-400 text-right mt-0.5">{formatTime(message.timestamp)}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <Avatar letter={user?.avatar ?? '?'} size="sm" />
      <div className="max-w-[75%]">
        <p className="text-[10px] text-gray-500 font-medium mb-0.5">{user?.name}</p>
        <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm">
          <p className="text-sm text-gray-900">{message.text}</p>
        </div>
        <p className="text-[10px] text-gray-400 mt-0.5">{formatTime(message.timestamp)}</p>
      </div>
    </div>
  )
}
