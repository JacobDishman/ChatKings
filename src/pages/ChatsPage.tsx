import { chats } from '@/data/mock'
import MyGroups from '@/components/home/MyGroups'

export default function ChatsPage() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">My Groups</h2>
      <MyGroups chats={chats} />
    </div>
  )
}
