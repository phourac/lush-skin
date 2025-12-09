import clsx from 'clsx';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  className?: string;
  error?: boolean;
  errorMessage?: string; // 👈 new

  rightElement?: React.ReactNode; // add this
  leftElement?: React.ReactNode; // add this
}

const CusInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      className = '',
      error = false,
      errorMessage,

      rightElement,
      leftElement,
      ...props
    },
    ref
  ) => {
    return (
      <div className='w-full'>
        <div className='relative w-full'>
          {leftElement && (
            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500'>
              {leftElement}
            </span>
          )}

          <input
            ref={ref}
            placeholder={placeholder}
            className={clsx(
              'text-typography-base placeholder:text-typography-muted focus:outline-primary w-full rounded-xl border py-2 pr-12 pl-4',
              error ? 'border-typography-error' : 'border-border',
              className
            )}
            {...props}
            value={props.value ?? ''}
          />

          {rightElement && (
            <span className='absolute inset-y-0 right-0 flex items-center text-sm text-gray-500'>
              {rightElement}
            </span>
          )}
        </div>

        {error && errorMessage && (
          <p className='text-typography-error mt-[6px] text-sm'>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

CusInput.displayName = 'CusInput';

export default CusInput;
