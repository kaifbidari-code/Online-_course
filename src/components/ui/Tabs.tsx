import { cn } from '../../utils/cn';

interface Tab { id: string; label: string; icon?: React.ReactNode; count?: number; }

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'line' | 'pill';
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, variant = 'line', className }: TabsProps) {
  return (
    <div className={cn(variant === 'line' ? 'border-b border-surface-200' : 'bg-surface-100 p-1 rounded-xl', className)} role="tablist">
      <div className={cn('flex', variant === 'line' ? 'gap-1 -mb-px' : 'gap-1')}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 outline-none',
              variant === 'line'
                ? cn('border-b-2 rounded-t-lg', activeTab === tab.id ? 'border-primary-600 text-primary-600 bg-primary-50' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-surface-300')
                : cn('rounded-lg', activeTab === tab.id ? 'bg-white text-primary-600 shadow-soft' : 'text-text-secondary hover:text-text-primary')
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn('inline-flex items-center justify-center w-5 h-5 text-xs rounded-full', activeTab === tab.id ? 'bg-primary-100 text-primary-700' : 'bg-surface-200 text-text-muted')}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
