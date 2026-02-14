import { useParams } from 'react-router-dom'
import { Crown } from 'lucide-react'
import { getChatById } from '@/data/mock'
import PageHeader from '@/components/shared/PageHeader'
import CreatePredictionForm from '@/components/prediction/CreatePredictionForm'

export default function CreatePredictionPage() {
  const { id } = useParams<{ id: string }>()
  const chat = getChatById(id!)

  if (!chat) {
    return <div className="p-8 text-center text-gray-500">Chat not found</div>
  }

  return (
    <div>
      <PageHeader
        title="Create Prediction"
        backTo={`/chat/${id}`}
        subtitle={chat.name}
        rightElement={
          <span className="flex items-center gap-1 text-xs font-bold text-king-gold bg-king-gold/10 px-2 py-1 rounded-full">
            <Crown size={12} />
            King
          </span>
        }
      />
      <CreatePredictionForm chatId={id!} />
    </div>
  )
}
