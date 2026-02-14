export function formatRelativeTime(dateString: string): string {
  const now = Date.now()
  const date = new Date(dateString).getTime()
  const diff = now - date
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(dateString).toLocaleDateString()
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString([], { month: 'short', day: 'numeric' })
}

const avatarColors = [
  'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500',
  'bg-teal-500', 'bg-cyan-500', 'bg-rose-500', 'bg-violet-500',
]

export function getAvatarColor(letter: string): string {
  const index = letter.charCodeAt(0) % avatarColors.length
  return avatarColors[index]
}

export function getTotalPot(options: Array<{ wagers: Array<{ amount: number }> }>): number {
  return options.reduce((sum, opt) => sum + opt.wagers.reduce((s, w) => s + w.amount, 0), 0)
}
