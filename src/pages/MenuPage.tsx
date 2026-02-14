import { Link } from 'react-router-dom'
import { MessageCircle, Activity, Crown, Users, BarChart3, BookOpen, ChevronRight } from 'lucide-react'
import { currentUser } from '@/data/mock'
import Avatar from '@/components/shared/Avatar'
import StrikeBadge from '@/components/layout/StrikeBadge'

const menuItems = [
  { icon: MessageCircle, label: 'Chats', description: 'All your group chats', to: '/chats' },
  { icon: Activity, label: 'My Activity', description: 'Prediction history & stats', to: '/activity' },
  { icon: Crown, label: 'King Status', description: 'How the crown works', to: '/rules' },
  { icon: Users, label: 'Friends', description: 'Manage friends & codes', to: '/friends' },
  { icon: BarChart3, label: 'History & Stats', description: 'Detailed performance data', to: '/activity' },
  { icon: BookOpen, label: 'Rules & Fair Play', description: 'Points system & strike rules', to: '/rules' },
]

export default function MenuPage() {
  return (
    <div className="p-4 space-y-4">
      {/* User Card */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
        <Avatar letter={currentUser.avatar} size="lg" />
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900">{currentUser.name}</h2>
          <p className="text-xs text-gray-500 font-mono">#{currentUser.addCode}</p>
          <div className="mt-1">
            <StrikeBadge strikes={currentUser.strikes} />
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, i) => {
          const Icon = item.icon
          return (
            <Link
              key={i}
              to={item.to}
              className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                <Icon size={20} className="text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <ChevronRight size={18} className="text-gray-400 shrink-0" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
