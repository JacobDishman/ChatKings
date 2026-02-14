import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl font-bold text-primary mb-2">404</div>
      <h1 className="text-xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-400 text-sm mb-6">The page you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate('/')}
        className="bg-primary text-black font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-colors"
      >
        <Home size={18} />
        Go Home
      </button>
    </div>
  );
}
