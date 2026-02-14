import { useState } from 'react';
import { Copy, UserPlus, Check, X } from 'lucide-react';
import { getCurrentUser, getFriends, friendRequests, getUserById } from '../data/mock';
import StrikeBadge from '../components/StrikeBadge';

export default function FriendsPage() {
  const currentUser = getCurrentUser();
  const friends = getFriends();
  const [addCode, setAddCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [requests, setRequests] = useState(friendRequests);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUser.addCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const acceptRequest = (userId: string) => {
    setRequests((prev) => prev.filter((r) => r.userId !== userId));
  };

  const declineRequest = (userId: string) => {
    setRequests((prev) => prev.filter((r) => r.userId !== userId));
  };

  return (
    <div className="px-4 py-4">
      <h1 className="text-lg font-bold mb-4">Friends</h1>

      {/* Your Add Code */}
      <div className="bg-surface rounded-xl border border-surface-lighter p-4 mb-4">
        <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">
          Your Add Code
        </span>
        <button
          onClick={handleCopy}
          className="w-full bg-surface-light rounded-lg px-4 py-3 flex items-center justify-between hover:bg-surface-lighter transition-colors"
        >
          <span className="text-2xl font-mono font-bold tracking-widest text-primary">
            {currentUser.addCode}
          </span>
          {copied ? (
            <span className="text-xs text-green-400 flex items-center gap-1">
              <Check size={14} /> Copied!
            </span>
          ) : (
            <Copy size={18} className="text-gray-400" />
          )}
        </button>
      </div>

      {/* Add Friend */}
      <div className="bg-surface rounded-xl border border-surface-lighter p-4 mb-4">
        <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">
          Add Friend
        </span>
        <div className="flex gap-2">
          <input
            type="text"
            value={addCode}
            onChange={(e) => setAddCode(e.target.value)}
            placeholder="Enter add code"
            className="flex-1 bg-surface-light border border-surface-lighter rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
          <button className="bg-primary text-black font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 hover:bg-primary-dark transition-colors text-sm">
            <UserPlus size={16} />
            Add
          </button>
        </div>
      </div>

      {/* Pending Requests */}
      {requests.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-3 text-gray-300">Pending Requests</h2>
          <div className="space-y-2">
            {requests.map((req) => (
              <div
                key={req.userId}
                className="bg-surface rounded-xl border border-surface-lighter p-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-surface-lighter flex items-center justify-center text-sm font-bold text-primary">
                  {req.avatar}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium">{req.name}</span>
                  <span className="block text-[10px] text-gray-500">Wants to be friends</span>
                </div>
                <button
                  onClick={() => acceptRequest(req.userId)}
                  className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary/30 transition-colors"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => declineRequest(req.userId)}
                  className="w-8 h-8 rounded-full bg-red-900/30 text-red-400 flex items-center justify-center hover:bg-red-900/50 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Friends */}
      <h2 className="text-sm font-bold mb-3 text-gray-300">My Friends</h2>
      <div className="space-y-2 pb-4">
        {friends.map((friend) => {
          const user = getUserById(friend.id);
          if (!user) return null;

          return (
            <div
              key={friend.id}
              className="bg-surface rounded-xl border border-surface-lighter p-3 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-surface-lighter flex items-center justify-center text-sm font-bold text-primary">
                {user.avatar}
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                  {user.online && <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />}
                  {user.online ? 'Online' : 'Offline'}
                </span>
              </div>
              <StrikeBadge strikes={user.strikes} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
