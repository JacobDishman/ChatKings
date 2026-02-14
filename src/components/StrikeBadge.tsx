import { Shield } from 'lucide-react';

interface StrikeBadgeProps {
  strikes: number;
  size?: 'sm' | 'md';
}

export default function StrikeBadge({ strikes, size = 'sm' }: StrikeBadgeProps) {
  const colorMap: Record<number, string> = {
    0: 'bg-green-900/50 text-green-400 border-green-700',
    1: 'bg-yellow-900/50 text-yellow-400 border-yellow-700',
    2: 'bg-orange-900/50 text-orange-400 border-orange-700',
    3: 'bg-red-900/50 text-red-400 border-red-700',
  };

  const classes = colorMap[strikes] ?? colorMap[0];
  const sizeClasses = size === 'sm' ? 'text-xs px-1.5 py-0.5 gap-1' : 'text-sm px-2 py-1 gap-1.5';
  const iconSize = size === 'sm' ? 10 : 14;

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${classes} ${sizeClasses}`}>
      <Shield size={iconSize} />
      {strikes}/3
    </span>
  );
}
