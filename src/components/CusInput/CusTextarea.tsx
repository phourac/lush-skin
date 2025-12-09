import clsx from 'clsx';
import React from 'react';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  className?: string;
  error?: boolean;
}

const CusTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ placeholder, className = '', error = false, ...props }, ref) => {
    return (
      <div className={clsx('relative w-full')}>
        <textarea
          ref={ref}
          placeholder={placeholder}
          className={clsx(
            'text-typography-base placeholder:text-typography-muted focus:outline-primary w-full resize-none rounded-[8px] border placeholder:font-medium',
            error ? 'border-red-500' : 'border-gray-300',
            className // 👈 user-defined class
          )}
          {...props}
        />
      </div>
    );
  }
);

CusTextarea.displayName = 'CusTextarea';

export default CusTextarea;
