import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

interface PageHeaderProps {
  title: string
  backTo?: string
  rightElement?: ReactNode
  subtitle?: string
}

export default function PageHeader({ title, backTo, rightElement, subtitle }: PageHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
      {backTo && (
        <button
          onClick={() => navigate(backTo)}
          className="p-1 -ml-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={22} className="text-gray-600" />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-semibold text-gray-900 truncate">{title}</h1>
        {subtitle && <p className="text-xs text-gray-500 truncate">{subtitle}</p>}
      </div>
      {rightElement}
    </div>
  )
}
