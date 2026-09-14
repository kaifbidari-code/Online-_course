import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2)}`;
    return (
      <div className="w-full">
        {label && <label htmlFor={inputId} className="label-base">{label}</label>}
        <div className="relative">
          {leftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">{leftIcon}</div>}
          <input
            ref={ref} id={inputId}
            className={cn(
              'input-base',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-error-500 focus:ring-error-500 focus:border-error-500',
              className
            )}
            {...props}
          />
          {rightIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">{rightIcon}</div>}
        </div>
        {error && <p className="mt-1 text-xs text-error-500 font-medium">{error}</p>}
        {hint && !error && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).slice(2)}`;
    return (
      <div className="w-full">
        {label && <label htmlFor={selectId} className="label-base">{label}</label>}
        <select
          ref={ref} id={selectId}
          className={cn('input-base appearance-none cursor-pointer', error && 'border-error-500', className)}
          {...props}
        >
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {error && <p className="mt-1 text-xs text-error-500 font-medium">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).slice(2)}`;
    return (
      <div className="w-full">
        {label && <label htmlFor={textareaId} className="label-base">{label}</label>}
        <textarea
          ref={ref} id={textareaId}
          className={cn('input-base resize-none', error && 'border-error-500', className)}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-error-500 font-medium">{error}</p>}
        {hint && !error && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
