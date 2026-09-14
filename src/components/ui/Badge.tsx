import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'gray' | 'purple' | 'blue';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'gray', size = 'md', className }: BadgeProps) {
  const variants = {
    primary: 'bg-primary-50 text-primary-700 border border-primary-200',
    success: 'bg-success-50 text-success-600 border border-success-100',
    warning: 'bg-warning-50 text-warning-600 border border-warning-100',
    error: 'bg-error-50 text-error-600 border border-error-100',
    gray: 'bg-surface-100 text-text-secondary border border-surface-200',
    purple: 'bg-violet-50 text-violet-700 border border-violet-200',
    blue: 'bg-sky-50 text-sky-700 border border-sky-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span className={clsx('inline-flex items-center gap-1 rounded-full font-semibold', variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}

export default Badge;
