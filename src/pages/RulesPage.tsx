import { Coins, Crown, Zap, TrendingUp, Shield, RefreshCw } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import CollapsibleSection from '@/components/shared/CollapsibleSection'

const rules = [
  {
    title: 'Points System',
    icon: <Coins size={18} className="text-brand" />,
    items: [
      'Points are the only currency — no real money involved',
      'Everyone starts each week with a fresh point total',
      'Points are wagered on predictions created by the King',
      'Winners split the pot proportionally to their wagers',
    ],
  },
  {
    title: 'The King',
    icon: <Crown size={18} className="text-king-gold" />,
    items: [
      'The King is the member with the most points in the group',
      'Only the King can create new predictions',
      'The King must place their own wager before publishing',
      'If someone overtakes the King in points, the crown transfers',
    ],
  },
  {
    title: 'Predictions',
    icon: <Zap size={18} className="text-orange-500" />,
    items: [
      'Predictions have a question and 2-6 answer options',
      'Members pick an option and wager points',
      'Minimum wager is set by the King',
      'Once placed, wagers are locked until resolution',
    ],
  },
  {
    title: 'Minority Bonus',
    icon: <TrendingUp size={18} className="text-brand" />,
    items: [
      'If you pick the correct answer AND you were in the minority, you earn a minority bonus',
      'Minority = fewer total points wagered on that option vs others',
      'The minority bonus is an extra 25% on top of normal winnings',
      'Minority wins are tracked on the leaderboard',
    ],
  },
  {
    title: 'Three-Strikes System',
    icon: <Shield size={18} className="text-red-500" />,
    items: [
      'Strikes are global — they apply across all your chats',
      'Strike 1 (yellow): Warning — you can still predict',
      'Strike 2 (orange): Careful — one more and you\'re locked',
      'Strike 3 (red): Locked out of all predictions until midnight',
      'Strikes reset to 0 at midnight every day',
    ],
  },
  {
    title: 'Weekly Resets',
    icon: <RefreshCw size={18} className="text-gray-500" />,
    items: [
      'Leaderboard rankings reset weekly (Sunday midnight)',
      'Your all-time stats are preserved in Activity',
      'King status carries over unless someone starts the new week stronger',
    ],
  },
]

export default function RulesPage() {
  return (
    <div className="pb-4">
      <PageHeader title="Rules & Fair Play" backTo="/menu" />
      <div className="p-4 space-y-3">
        {rules.map((section, i) => (
          <CollapsibleSection key={i} title={section.title} icon={section.icon} defaultOpen={i === 0}>
            <ol className="space-y-2">
              {section.items.map((item, j) => (
                <li key={j} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-gray-400 font-medium shrink-0">{j + 1}.</span>
                  {item}
                </li>
              ))}
            </ol>
          </CollapsibleSection>
        ))}
      </div>
    </div>
  )
}
