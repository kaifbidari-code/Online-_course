import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { Toast } from '../../context/AppContext';
import { useApp } from '../../context/AppContext';

const icons = {
  success: <CheckCircle size={18} className="text-success-500" />,
  error: <XCircle size={18} className="text-error-500" />,
  warning: <AlertTriangle size={18} className="text-warning-500" />,
  info: <Info size={18} className="text-primary-500" />,
};

const colors = {
  success: 'border-l-success-500',
  error: 'border-l-error-500',
  warning: 'border-l-warning-500',
  info: 'border-l-primary-500',
};

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useApp();
  return (
    <div className={cn('flex items-start gap-3 bg-white rounded-xl shadow-elevated border border-surface-200 border-l-4 p-4 min-w-[300px] max-w-sm animate-slide-up', colors[toast.type])}>
      <div className="shrink-0 mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary">{toast.title}</p>
        {toast.message && <p className="text-xs text-text-secondary mt-0.5">{toast.message}</p>}
      </div>
      <button onClick={() => removeToast(toast.id)} className="shrink-0 text-text-muted hover:text-text-primary transition-colors" aria-label="Dismiss">
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useApp();
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2" aria-live="polite" aria-label="Notifications">
      {toasts.map(t => <ToastItem key={t.id} toast={t} />)}
    </div>
  );
}
