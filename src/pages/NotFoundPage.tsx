import { Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <AlertCircle className="w-16 h-16 text-gray-300 mb-4" />
      <h1 className="text-6xl font-bold text-gray-200 mb-2">404</h1>
      <p className="text-gray-500 mb-6">Page not found</p>
      <Link
        to="/"
        className="px-6 py-2 bg-brand text-white rounded-lg font-medium hover:bg-brand-dark transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}
