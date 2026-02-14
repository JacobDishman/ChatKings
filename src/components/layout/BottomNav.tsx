import { Link, useLocation } from 'react-router-dom'
import { Home, MessageCircle, Users, Menu } from 'lucide-react'

const tabs = [
  { path: '/', icon: Home, label: 'Home', match: (p: string) => p === '/' },
  { path: '/chats', icon: MessageCircle, label: 'Chats', match: (p: string) => p.startsWith('/chat') },
  { path: '/friends', icon: Users, label: 'Friends', match: (p: string) => p === '/friends' },
  { path: '/menu', icon: Menu, label: 'Menu', match: (p: string) => p === '/menu' || p === '/rules' || p === '/activity' },
]

export default function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-30">
      <div className="flex">
        {tabs.map(tab => {
          const active = tab.match(pathname)
          const Icon = tab.icon
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex-1 flex flex-col items-center py-2 pt-2.5 transition-colors duration-200 relative ${
                active ? 'text-brand' : 'text-gray-400'
              }`}
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand rounded-full" />
              )}
              <Icon size={20} />
              <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
