import { Shield } from 'lucide-react'

interface StrikeBadgeProps {
  strikes: number
  size?: 'sm' | 'md'
}

export default function StrikeBadge({ strikes, size = 'sm' }: StrikeBadgeProps) {
  const colorMap: Record<number, string> = {
    0: 'bg-green-100 text-green-700',
    1: 'bg-yellow-100 text-yellow-700',
    2: 'bg-orange-100 text-orange-700',
    3: 'bg-red-100 text-red-700',
  }

  const iconColorMap: Record<number, string> = {
    0: 'text-green-500',
    1: 'text-yellow-500',
    2: 'text-orange-500',
    3: 'text-red-500',
  }

  const colors = colorMap[strikes] ?? colorMap[3]
  const iconColor = iconColorMap[strikes] ?? iconColorMap[3]
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1'
  const iconSize = size === 'sm' ? 12 : 14

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${colors} ${sizeClasses}`}>
      <Shield size={iconSize} className={iconColor} />
      {strikes}/3
    </span>
  )
}
