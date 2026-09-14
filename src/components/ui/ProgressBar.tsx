import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number; // 0–100
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const sizes = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };
const colors = {
  primary: 'bg-primary-600',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  error: 'bg-error-500',
};

export function ProgressBar({ value, size = 'md', color = 'primary', showLabel, animated, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-text-secondary">Progress</span>
          <span className="text-xs font-bold text-text-primary">{Math.round(clamped)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-surface-200 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', colors[color], animated && 'animate-pulse-soft')}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
