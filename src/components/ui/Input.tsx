import { forwardRef, type InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label, error, hint, leftIcon, rightIcon, className, id, ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-primary mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full px-4 py-3 bg-white border rounded-xl text-text-primary placeholder:text-text-muted transition-all duration-200',
            'focus:border-primary-400 focus:ring-2 focus:ring-primary-100',
            error ? 'border-error-500 focus:border-error-500 focus:ring-error-100' : 'border-surface-200',
            leftIcon && 'pl-11',
            rightIcon && 'pr-11',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-error-600 flex items-center gap-1">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-xs text-text-muted">{hint}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;

// Textarea variant
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label, error, hint, className, id, ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-text-primary mb-1.5">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={clsx(
          'w-full px-4 py-3 bg-white border rounded-xl text-text-primary placeholder:text-text-muted transition-all duration-200 resize-none',
          'focus:border-primary-400 focus:ring-2 focus:ring-primary-100',
          error ? 'border-error-500' : 'border-surface-200',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-error-600">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-xs text-text-muted">{hint}</p>}
    </div>
  );
});
Textarea.displayName = 'Textarea';

// Select variant
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label, error, options, className, id, ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-text-primary mb-1.5">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={clsx(
          'w-full px-4 py-3 bg-white border rounded-xl text-text-primary transition-all duration-200 appearance-none cursor-pointer',
          'focus:border-primary-400 focus:ring-2 focus:ring-primary-100',
          error ? 'border-error-500' : 'border-surface-200',
          className
        )}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-error-600">{error}</p>}
    </div>
  );
});
Select.displayName = 'Select';
