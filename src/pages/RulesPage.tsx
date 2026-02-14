import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Coins, Crown, Zap, Award, Shield, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface RuleSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  rules: string[];
}

const sections: RuleSection[] = [
  {
    id: 'points',
    title: 'Points System',
    icon: <Coins size={18} />,
    iconBg: 'bg-primary/20 text-primary',
    rules: [
      'Points are the only currency — no real money involved',
      'Everyone starts each week with a fresh point total',
      'Points are wagered on predictions created by the King',
      'Winners split the pot proportionally to their wagers',
    ],
  },
  {
    id: 'king',
    title: 'The King',
    icon: <Crown size={18} />,
    iconBg: 'bg-gold/20 text-gold',
    rules: [
      'The King is the member with the most points in the group',
      'Only the King can create new predictions',
      'The King must place their own wager before publishing',
      'If someone overtakes the King in points, the crown transfers',
    ],
  },
  {
    id: 'predictions',
    title: 'Predictions',
    icon: <Zap size={18} />,
    iconBg: 'bg-orange-900/30 text-orange-400',
    rules: [
      'Predictions have a question and 2–6 answer options',
      'Members pick an option and wager points',
      'Minimum wager is set by the King',
      'Once placed, wagers are locked until resolution',
    ],
  },
  {
    id: 'minority',
    title: 'Minority Bonus',
    icon: <Award size={18} />,
    iconBg: 'bg-primary/20 text-primary',
    rules: [
      'If you pick the correct answer AND you were in the minority, you earn a minority bonus',
      'Minority = fewer total points wagered on that option vs others',
      'The minority bonus is an extra 25% on top of normal winnings',
      'Minority wins are tracked on the leaderboard',
    ],
  },
  {
    id: 'strikes',
    title: 'Three-Strikes System',
    icon: <Shield size={18} />,
    iconBg: 'bg-red-900/30 text-red-400',
    rules: [
      'Strikes are global — they apply across all your chats',
      'Strike 1 (yellow): Warning — you can still predict',
      'Strike 2 (orange): Careful — one more and you\'re locked',
      'Strike 3 (red): Locked out of all predictions until midnight',
      'Strikes reset to 0 at midnight every day',
    ],
  },
  {
    id: 'resets',
    title: 'Weekly Resets',
    icon: <RefreshCw size={18} />,
    iconBg: 'bg-surface-lighter text-gray-400',
    rules: [
      'Leaderboard rankings reset weekly (Sunday midnight)',
      'Your all-time stats are preserved in Activity',
      'King status carries over unless someone starts the new week stronger',
    ],
  },
];

export default function RulesPage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['points']));

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen">
      <header className="bg-surface border-b border-surface-lighter px-3 py-3 flex items-center gap-2">
        <button onClick={() => navigate(-1)} className="p-1 text-gray-400 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-sm">Rules & Fair Play</h1>
      </header>

      <div className="px-4 py-4 space-y-3 pb-8">
        {sections.map((section) => {
          const isOpen = expanded.has(section.id);
          return (
            <div key={section.id} className="bg-surface rounded-xl border border-surface-lighter overflow-hidden">
              <button
                onClick={() => toggle(section.id)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${section.iconBg}`}>
                  {section.icon}
                </div>
                <span className="flex-1 font-semibold text-sm">{section.title}</span>
                {isOpen ? (
                  <ChevronUp size={16} className="text-gray-500" />
                ) : (
                  <ChevronDown size={16} className="text-gray-500" />
                )}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-0">
                  <div className="border-t border-surface-lighter pt-3 space-y-2">
                    {section.rules.map((rule, idx) => (
                      <div key={idx} className="flex gap-2 text-sm text-gray-300">
                        <span className="text-xs text-gray-500 font-bold mt-0.5 w-5 flex-shrink-0">
                          {idx + 1}.
                        </span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
