import { getAvatarColor } from '@/lib/utils'

interface AvatarProps {
  letter: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
}

export default function Avatar({ letter, size = 'md', className = '' }: AvatarProps) {
  return (
    <div
      className={`${sizeMap[size]} ${getAvatarColor(letter)} rounded-full flex items-center justify-center text-white font-bold shrink-0 ${className}`}
    >
      {letter}
    </div>
  )
}
