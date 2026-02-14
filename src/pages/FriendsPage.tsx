import { useState } from 'react'
import { Copy, UserPlus, Check, X } from 'lucide-react'
import { currentUser, users, friendRequests, getUserById } from '@/data/mock'
import Avatar from '@/components/shared/Avatar'
import StrikeBadge from '@/components/layout/StrikeBadge'

export default function FriendsPage() {
  const [copied, setCopied] = useState(false)
  const [addCode, setAddCode] = useState('')
  const [requests, setRequests] = useState(friendRequests)

  const friends = users.filter(u => u.id !== currentUser.id && !requests.some(r => r.userId === u.id))

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentUser.addCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAccept = (reqId: string) => {
    setRequests(prev => prev.filter(r => r.id !== reqId))
  }

  const handleDecline = (reqId: string) => {
    setRequests(prev => prev.filter(r => r.id !== reqId))
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Friends</h2>

      {/* Your Add Code */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <p className="text-xs text-gray-500 font-medium mb-2">Your Add Code</p>
        <div className="flex items-center gap-3">
          <span className="font-mono text-2xl font-bold text-gray-900 tracking-wider">{currentUser.addCode}</span>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {copied ? (
              <Check size={18} className="text-brand" />
            ) : (
              <Copy size={18} className="text-gray-400" />
            )}
          </button>
        </div>
        {copied && <p className="text-xs text-brand mt-1">Copied!</p>}
      </div>

      {/* Add Friend */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <p className="text-xs text-gray-500 font-medium mb-2">Add Friend</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={addCode}
            onChange={e => setAddCode(e.target.value)}
            placeholder="Enter friend's code"
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand"
          />
          <button className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors flex items-center gap-1.5">
            <UserPlus size={16} />
            Add
          </button>
        </div>
      </div>

      {/* Pending Requests */}
      {requests.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Pending Requests ({requests.length})</h3>
          <div className="space-y-2">
            {requests.map(req => {
              const user = getUserById(req.userId)
              return (
                <div key={req.id} className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3">
                  <Avatar letter={user?.avatar ?? '?'} size="md" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">Wants to be friends</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleAccept(req.id)}
                      className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center hover:bg-brand/20 transition-colors"
                    >
                      <Check size={16} className="text-brand" />
                    </button>
                    <button
                      onClick={() => handleDecline(req.id)}
                      className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                    >
                      <X size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Friend List */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">My Friends ({friends.length})</h3>
        <div className="space-y-2">
          {friends.map(friend => (
            <div key={friend.id} className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3">
              <Avatar letter={friend.avatar} size="md" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{friend.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  {friend.online && (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      Online
                    </span>
                  )}
                  <StrikeBadge strikes={friend.strikes} size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
