import { useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Trophy, Crown, Plus, ChevronLeft, AlertTriangle } from 'lucide-react'
import { getChatById, getUserById, currentUser } from '@/data/mock'
import { useLocalMessages } from '@/hooks/useLocalMessages'
import MessageBubble from '@/components/chat/MessageBubble'
import ActivePredictionCard from '@/components/chat/ActivePredictionCard'
import ChatInput from '@/components/chat/ChatInput'

export default function ChatDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const chat = getChatById(id!)
  const { messages, addMessage } = useLocalMessages(id!)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!chat) {
    return <div className="p-8 text-center text-gray-500">Chat not found</div>
  }

  const king = chat.members.find(m => m.isKing)
  const kingUser = king ? getUserById(king.userId) : undefined
  const myMembership = chat.members.find(m => m.userId === currentUser.id)
  const isKing = king?.userId === currentUser.id
  const isLockedOut = currentUser.strikes >= 3

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/chats')}
            className="p-1 -ml-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={22} className="text-gray-600" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-gray-900 truncate">{chat.name}</h1>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              {kingUser && (
                <span className="flex items-center gap-1">
                  <Crown size={10} className="text-king-gold" />
                  {kingUser.name}
                </span>
              )}
              <span>{chat.members.length} members</span>
              {myMembership && <span className="font-medium text-brand">{myMembership.points} pts</span>}
            </div>
          </div>

          <Link
            to={`/chat/${id}/leaderboard`}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Trophy size={20} className="text-king-gold" />
          </Link>
        </div>
      </div>

      {/* Strike warning */}
      {currentUser.strikes >= 2 && (
        <div className={`mx-4 mt-2 px-3 py-2 rounded-lg flex items-center gap-2 ${
          currentUser.strikes >= 3
            ? 'bg-red-50 border border-red-200'
            : 'bg-orange-50 border border-orange-200'
        }`}>
          <AlertTriangle size={14} className={currentUser.strikes >= 3 ? 'text-red-500' : 'text-orange-500'} />
          <p className={`text-xs font-medium ${currentUser.strikes >= 3 ? 'text-red-700' : 'text-orange-700'}`}>
            {currentUser.strikes >= 3
              ? "Locked out — predictions disabled until midnight reset"
              : "2 strikes — one more and you're locked out!"}
          </p>
        </div>
      )}

      {/* Active Prediction */}
      {chat.activePrediction && (
        <ActivePredictionCard prediction={chat.activePrediction} isLockedOut={isLockedOut} />
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* King create prediction button */}
      {isKing && !chat.activePrediction && (
        <div className="px-4 pb-2">
          <Link
            to={`/chat/${id}/create-prediction`}
            className="w-full flex items-center justify-center gap-2 py-3 bg-king-gold/10 border-2 border-king-gold/30 text-king-gold rounded-xl font-semibold text-sm hover:bg-king-gold/20 transition-colors"
          >
            <Plus size={18} />
            Create Prediction
          </Link>
        </div>
      )}

      {/* Input */}
      <ChatInput onSend={addMessage} />
    </div>
  )
}
