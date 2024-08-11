import { cn } from '@/src/lib/utils';
import React from 'react';


interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  id: string;
  label?: React.ReactNode;
  error?: string;
  containerClassName?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error,
      isLoading,
      isDisabled,
      required,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('flex flex-col space-y-1 min-w-80 font-atten_new', containerClassName)}>
        {label && (
          <span className={cn(
            'text-lg font-medium text-gray-900'
          )}>
            {label} {required && <span className=' text-red-400 text-sm italic'>required</span>}
          </span>
        )}
        <input
          id={id}
          className={cn(
            'border border-neutral-2 rounded-2xl placeholder:text-neutral-2 text-neutral-1',
            'focus:border-neutral-2 active:border-neutral-2',
            'h-10 py-1 px-4',
            isDisabled || isLoading ? `
              'bg-neutral-3 text-neutral-8 placeholder:text-neutral-6 cursor-not-allowed',
              'active:bg-neutral-3 active:text-neutral-8 active:placeholder:text-neutral-6 active:border-neutral-6'
              ` : '',
            className
          )}
          ref={ref}
          disabled={!!isDisabled || !!isLoading}
          aria-invalid={!!error}
          aria-describedby={error ? `error-${id}` : undefined}
          {...props}
        />
        {error && (
          <span id={`error-${id}`} className='text-red-400'>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
