import { useNavigate } from 'react-router-dom';
import { Crown, Zap, Users } from 'lucide-react';
import { chats, getKingOfChat, getUserMembership, currentUserId, getPotTotal } from '../data/mock';

export default function GroupChats() {
  const navigate = useNavigate();

  return (
    <section className="px-4 pt-5">
      <h2 className="text-lg font-bold mb-3">My Groups</h2>
      <div className="space-y-3">
        {chats.map((chat) => {
          const king = getKingOfChat(chat);
          const myMembership = getUserMembership(chat, currentUserId);
          const hasActive = !!chat.activePrediction;
          const potTotal = hasActive ? getPotTotal(chat.activePrediction!) : 0;

          return (
            <button
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="w-full bg-surface rounded-xl p-4 border border-surface-lighter flex items-center gap-3 text-left hover:border-primary/30 transition-colors"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-surface-lighter flex items-center justify-center text-lg font-bold text-primary">
                  {chat.name[0]}
                </div>
                {hasActive && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center">
                    <Zap size={12} className="text-white" />
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate">{chat.name}</span>
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                  {king && (
                    <span className="flex items-center gap-1">
                      <Crown size={10} className="text-gold" />
                      {king.name}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Users size={10} />
                    {chat.members.length}
                  </span>
                </div>
                {hasActive && (
                  <span className="text-[10px] text-warning font-medium mt-1 inline-block">
                    {potTotal} pts in pot
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-primary font-bold text-lg">{myMembership?.points ?? 0}</span>
                <span className="block text-[10px] text-gray-500">pts</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
