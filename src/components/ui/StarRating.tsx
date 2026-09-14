import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showValue?: boolean;
  className?: string;
}

const sizes = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };

export function StarRating({ rating, maxStars = 5, size = 'md', interactive, onChange, showValue, className }: StarRatingProps) {
  const [hovered, setHovered] = React.useState(0);
  const active = interactive ? (hovered || rating) : rating;

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: maxStars }, (_, i) => {
        const starValue = i + 1;
        const filled = active >= starValue;
        const halfFilled = !filled && active >= starValue - 0.5;
        return (
          <button
            key={i}
            type={interactive ? 'button' : undefined}
            className={cn('transition-colors', interactive && 'cursor-pointer hover:scale-110')}
            onClick={interactive ? () => onChange?.(starValue) : undefined}
            onMouseEnter={interactive ? () => setHovered(starValue) : undefined}
            onMouseLeave={interactive ? () => setHovered(0) : undefined}
            aria-label={interactive ? `Rate ${starValue} out of ${maxStars}` : undefined}
          >
            <Star
              className={cn(sizes[size], filled ? 'fill-warning-500 text-warning-500' : halfFilled ? 'fill-warning-200 text-warning-500' : 'text-surface-300')}
            />
          </button>
        );
      })}
      {showValue && <span className="ml-1 text-sm font-semibold text-text-primary">{rating.toFixed(1)}</span>}
    </div>
  );
}
