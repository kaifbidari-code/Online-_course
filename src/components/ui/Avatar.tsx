import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = { xs: 'w-6 h-6 text-xs', sm: 'w-8 h-8 text-sm', md: 'w-10 h-10 text-base', lg: 'w-12 h-12 text-lg', xl: 'w-16 h-16 text-xl' };

const getInitials = (name: string) => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

const colorMap: Record<string, string> = {};
const colors = ['bg-primary-500', 'bg-purple-500', 'bg-success-500', 'bg-warning-500', 'bg-pink-500', 'bg-cyan-500'];
const getColor = (name: string) => {
  if (!colorMap[name]) { colorMap[name] = colors[name.length % colors.length]; }
  return colorMap[name];
};

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);
  return (
    <div className={cn('relative inline-flex shrink-0 items-center justify-center rounded-full overflow-hidden', sizeClasses[size], className)}>
      {src && !imgError ? (
        <img src={src} alt={name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
      ) : (
        <div className={cn('w-full h-full flex items-center justify-center text-white font-semibold', getColor(name))}>
          {getInitials(name)}
        </div>
      )}
    </div>
  );
}
