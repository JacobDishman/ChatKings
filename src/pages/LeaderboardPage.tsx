import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown } from 'lucide-react';
import { getChatById, getUserById, currentUserId } from '../data/mock';
import StrikeBadge from '../components/StrikeBadge';

export default function LeaderboardPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const chat = getChatById(id ?? '');

  if (!chat) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Chat not found
      </div>
    );
  }

  const sorted = [...chat.members].sort((a, b) => b.points - a.points);

  const rankColors: Record<number, string> = {
    0: 'bg-yellow-500 text-black',
    1: 'bg-gray-400 text-black',
    2: 'bg-orange-600 text-white',
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-surface border-b border-surface-lighter px-3 py-3 flex items-center gap-2">
        <button onClick={() => navigate(`/chat/${id}`)} className="p-1 text-gray-400 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-sm">Leaderboard</h1>
          <span className="text-[10px] text-gray-400">{chat.name}</span>
        </div>
      </header>

      {/* Reset Timer */}
      <div className="px-4 pt-3">
        <div className="bg-surface-light rounded-lg px-3 py-2 text-center text-xs text-gray-400">
          Weekly reset in <span className="text-white font-medium">4 days</span>
        </div>
      </div>

      {/* Podium */}
      {sorted.length >= 3 && (
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-end justify-center gap-3">
            {/* 2nd Place */}
            {(() => {
              const member = sorted[1];
              const user = getUserById(member.userId);
              return (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-surface-lighter flex items-center justify-center text-lg font-bold text-gray-300 mb-1">
                    {user?.avatar}
                  </div>
                  <span className="text-xs font-medium text-gray-300 mb-1">{user?.name}</span>
                  <span className="text-xs text-gray-400">{member.points} pts</span>
                  <div className="w-20 h-16 bg-gray-600 rounded-t-lg mt-2 flex items-center justify-center text-lg font-bold text-gray-300">
                    2
                  </div>
                </div>
              );
            })()}
            {/* 1st Place */}
            {(() => {
              const member = sorted[0];
              const user = getUserById(member.userId);
              return (
                <div className="flex flex-col items-center">
                  <Crown size={24} className="text-gold mb-1" />
                  <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xl font-bold text-primary mb-1">
                    {user?.avatar}
                  </div>
                  <span className="text-sm font-bold text-white mb-1">{user?.name}</span>
                  <span className="text-xs text-primary font-semibold">{member.points} pts</span>
                  <div className="w-20 h-24 bg-primary rounded-t-lg mt-2 flex items-center justify-center text-xl font-bold text-black">
                    1
                  </div>
                </div>
              );
            })()}
            {/* 3rd Place */}
            {(() => {
              const member = sorted[2];
              const user = getUserById(member.userId);
              return (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-surface-lighter flex items-center justify-center text-lg font-bold text-orange-400 mb-1">
                    {user?.avatar}
                  </div>
                  <span className="text-xs font-medium text-gray-300 mb-1">{user?.name}</span>
                  <span className="text-xs text-gray-400">{member.points} pts</span>
                  <div className="w-20 h-12 bg-orange-800 rounded-t-lg mt-2 flex items-center justify-center text-lg font-bold text-orange-200">
                    3
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Full List */}
      <div className="px-4 pb-8">
        <div className="space-y-2">
          {sorted.map((member, idx) => {
            const user = getUserById(member.userId);
            if (!user) return null;
            const isMe = member.userId === currentUserId;

            return (
              <div
                key={member.userId}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  isMe ? 'bg-primary/10 border border-primary/30' : 'bg-surface border border-surface-lighter'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    rankColors[idx] ?? 'bg-surface-lighter text-gray-400'
                  }`}
                >
                  {idx + 1}
                </span>
                <div className="w-9 h-9 rounded-full bg-surface-lighter flex items-center justify-center text-sm font-bold text-primary">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-medium truncate ${isMe ? 'text-primary' : ''}`}>
                      {user.name}
                    </span>
                    {member.isKing && <Crown size={12} className="text-gold flex-shrink-0" />}
                  </div>
                  <span className="text-[10px] text-gray-500">{member.minorityWins} minority wins</span>
                </div>
                <StrikeBadge strikes={user.strikes} />
                <span className="font-bold text-sm text-right min-w-[50px]">{member.points}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
