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
        'w-full h-14 px-5 py-3 rounded-xl text-base',
        'placeholder:text-[var(--color-secondary-grey)] placeholder:font-light placeholder:text-sm',
        'border border-[var(--color-secondary-outline)]',
        'focus:outline-none focus:ring-0 focus:border-[var(--color-primary-black)]',
        'disabled:bg-[var(--color-secondary-disabled-grey)] disabled:cursor-not-allowed',
        'transition-colors',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
export default Input;
