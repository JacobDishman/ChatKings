import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({ children, className = '', onClick }: CardProps) {
  const interactive = onClick ? 'cursor-pointer hover:shadow-md active:scale-[0.98]' : ''
  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-4 transition-all duration-200 ${interactive} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
