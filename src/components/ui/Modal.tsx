import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-6xl',
};

export function Modal({ isOpen, onClose, title, children, size = 'md', className }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) { document.addEventListener('keydown', handleKeyDown); document.body.style.overflow = 'hidden'; }
    return () => { document.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = ''; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative w-full bg-white rounded-2xl shadow-elevated animate-scale-in flex flex-col max-h-[90vh]', sizes[size], className)}>
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-surface-200 shrink-0">
            <h2 className="text-lg font-bold text-text-primary">{title}</h2>
            <button onClick={onClose} className="btn-ghost p-2 -mr-2" aria-label="Close modal"><X size={18} /></button>
          </div>
        )}
        {!title && (
          <button onClick={onClose} className="absolute top-4 right-4 z-10 btn-ghost p-2" aria-label="Close modal"><X size={18} /></button>
        )}
        <div className="overflow-y-auto flex-1 scrollbar-thin">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
