import { forwardRef } from 'react';
import { clsx } from 'clsx';

type AllowedTypes = 'text' | 'password' | 'email';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: AllowedTypes;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={clsx(
        'input-w-full h-14 px-6 py-3 rounded-xl text-base',
        'bg-[var(--color-secondary-offwhite)]',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
export default Input;
