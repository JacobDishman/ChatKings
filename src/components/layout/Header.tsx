import { Crown } from 'lucide-react'
import { currentUser } from '@/data/mock'
import StrikeBadge from './StrikeBadge'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Crown size={22} className="text-king-gold" />
        <span className="text-xl font-bold text-brand">ChatKings</span>
      </div>
      <StrikeBadge strikes={currentUser.strikes} />
    </header>
  )
}
