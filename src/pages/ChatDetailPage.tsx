import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Users, Trophy, Send, Zap, Lock } from 'lucide-react';
import {
  getChatById,
  getKingOfChat,
  getUserMembership,
  getUserById,
  currentUserId,
  getCurrentUser,
  chatMessages,
  getPotTotal,
} from '../data/mock';
import StrikeBadge from '../components/StrikeBadge';

export default function ChatDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const chat = getChatById(id ?? '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(chatMessages[id ?? ''] ?? []);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [wagerAmount, setWagerAmount] = useState('');

  const currentUser = getCurrentUser();
  const isLockedOut = currentUser.strikes >= 3;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!chat) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Chat not found
      </div>
    );
  }

  const king = getKingOfChat(chat);
  const myMembership = getUserMembership(chat, currentUserId);
  const isKing = myMembership?.isKing ?? false;
  const prediction = chat.activePrediction;

  const handleSend = () => {
    if (!messageText.trim()) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      userId: currentUserId,
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      type: 'user' as const,
    };
    setMessages((prev) => [...prev, newMsg]);
    setMessageText('');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-surface border-b border-surface-lighter px-3 py-3 flex items-center gap-2 flex-shrink-0">
        <button onClick={() => navigate('/chats')} className="p-1 text-gray-400 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-sm truncate">{chat.name}</h1>
          <div className="flex items-center gap-2 text-[10px] text-gray-400">
            {king && (
              <span className="flex items-center gap-0.5">
                <Crown size={10} className="text-gold" />
                {king.name}
              </span>
            )}
            <span className="flex items-center gap-0.5">
              <Users size={10} />
              {chat.members.length}
            </span>
          </div>
        </div>
        <span className="text-primary font-bold text-sm">{myMembership?.points ?? 0} pts</span>
        <button
          onClick={() => navigate(`/chat/${chat.id}/leaderboard`)}
          className="p-1.5 text-gold hover:text-gold-light"
        >
          <Trophy size={18} />
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Strike Warning */}
        {currentUser.strikes >= 2 && (
          <div
            className={`mx-3 mt-3 p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
              isLockedOut
                ? 'bg-red-900/30 text-red-400 border border-red-800'
                : 'bg-orange-900/30 text-orange-400 border border-orange-800'
            }`}
          >
            {isLockedOut ? (
              <>
                <Lock size={16} />
                Locked out — predictions disabled until midnight reset
              </>
            ) : (
              <>
                <StrikeBadge strikes={currentUser.strikes} />
                2 strikes — one more and you're locked out!
              </>
            )}
          </div>
        )}

        {/* Active Prediction */}
        {prediction && (
          <div className="mx-3 mt-3 bg-surface rounded-xl border border-surface-lighter overflow-hidden">
            <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 flex items-center justify-between">
              <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                <Zap size={14} />
                ACTIVE PREDICTION
              </span>
              <span className="text-xs text-gray-400">{getPotTotal(prediction)} pts in pot</span>
            </div>
            <div className="p-4">
              <p className="font-semibold text-sm mb-3">{prediction.question}</p>
              <div className="space-y-2">
                {prediction.options.map((opt) => {
                  const optTotal = opt.wagers.reduce((s, w) => s + w.amount, 0);
                  const isSelected = selectedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      disabled={isLockedOut}
                      onClick={() => setSelectedOption(isSelected ? null : opt.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors flex items-center justify-between ${
                        isLockedOut
                          ? 'bg-surface-lighter/50 border-surface-lighter text-gray-600 cursor-not-allowed'
                          : isSelected
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-surface-light border-surface-lighter hover:border-gray-500'
                      }`}
                    >
                      <span>{opt.text}</span>
                      <span className="text-xs text-gray-500">{optTotal} pts</span>
                    </button>
                  );
                })}
              </div>
              {selectedOption && !isLockedOut && (
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="number"
                    value={wagerAmount}
                    onChange={(e) => setWagerAmount(e.target.value)}
                    placeholder={`Min ${prediction.minWager}`}
                    className="flex-1 bg-surface-light border border-surface-lighter rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                  />
                  <button className="bg-primary text-black font-bold px-4 py-2 rounded-lg text-sm hover:bg-primary-dark transition-colors">
                    Place
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* King Create Button */}
        {isKing && !prediction && (
          <div className="mx-3 mt-3">
            <button
              onClick={() => navigate(`/chat/${chat.id}/create-prediction`)}
              className="w-full bg-gold/20 border border-gold/40 text-gold font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gold/30 transition-colors"
            >
              <Crown size={18} />
              Create Prediction
            </button>
          </div>
        )}

        {/* Messages */}
        <div className="px-3 py-4 space-y-3">
          {messages.map((msg) => {
            if (msg.type === 'system') {
              return (
                <div key={msg.id} className="flex justify-center">
                  <span className="bg-surface-lighter text-gray-400 text-xs px-3 py-1 rounded-full">
                    {msg.text}
                  </span>
                </div>
              );
            }

            const isMe = msg.userId === currentUserId;
            const sender = getUserById(msg.userId);

            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] ${isMe ? '' : 'flex gap-2'}`}>
                  {!isMe && (
                    <div className="w-7 h-7 rounded-full bg-surface-lighter flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 mt-5">
                      {sender?.avatar}
                    </div>
                  )}
                  <div>
                    {!isMe && (
                      <span className="text-[10px] text-gray-500 ml-1 mb-0.5 block">{sender?.name}</span>
                    )}
                    <div
                      className={`px-3 py-2 rounded-2xl text-sm ${
                        isMe
                          ? 'bg-primary text-black rounded-br-md'
                          : 'bg-surface-light text-gray-200 rounded-bl-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className={`text-[10px] text-gray-600 mt-0.5 block ${isMe ? 'text-right mr-1' : 'ml-1'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-surface border-t border-surface-lighter px-3 py-2 flex items-center gap-2 flex-shrink-0">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Message..."
          className="flex-1 bg-surface-light border border-surface-lighter rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
        />
        <button
          onClick={handleSend}
          className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-black hover:bg-primary-dark transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
