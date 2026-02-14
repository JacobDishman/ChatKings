import { useNavigate } from 'react-router-dom';
import { MessageCircle, Activity, Crown, Users, BarChart3, BookOpen, ChevronRight } from 'lucide-react';
import { getCurrentUser } from '../data/mock';
import StrikeBadge from '../components/StrikeBadge';

const menuItems = [
  { to: '/chats', icon: MessageCircle, label: 'Chats', desc: 'All your group chats', color: 'text-primary' },
  { to: '/activity', icon: Activity, label: 'My Activity', desc: 'Prediction history & stats', color: 'text-blue-400' },
  { to: '/rules', icon: Crown, label: 'King Status', desc: 'How the crown works', color: 'text-gold' },
  { to: '/friends', icon: Users, label: 'Friends', desc: 'Manage friends & codes', color: 'text-purple-400' },
  { to: '/activity', icon: BarChart3, label: 'History & Stats', desc: 'Detailed performance data', color: 'text-orange-400' },
  { to: '/rules', icon: BookOpen, label: 'Rules & Fair Play', desc: 'Points system & strike rules', color: 'text-red-400' },
];

export default function MenuPage() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  return (
    <div className="px-4 py-4">
      {/* User Card */}
      <div className="bg-surface rounded-xl border border-surface-lighter p-4 flex items-center gap-3 mb-6">
        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
          {user.avatar}
        </div>
        <div className="flex-1">
          <span className="font-bold text-lg">{user.name}</span>
          <span className="block text-xs text-gray-400">#{user.addCode}</span>
        </div>
        <StrikeBadge strikes={user.strikes} size="md" />
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map(({ to, icon: Icon, label, desc, color }) => (
          <button
            key={label}
            onClick={() => navigate(to)}
            className="w-full bg-surface rounded-xl border border-surface-lighter p-4 flex items-center gap-3 text-left hover:border-primary/30 transition-colors"
          >
            <Icon size={20} className={color} />
            <div className="flex-1">
              <span className="text-sm font-medium block">{label}</span>
              <span className="text-[10px] text-gray-500">{desc}</span>
            </div>
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        ))}
      </div>
    </div>
  );
}
