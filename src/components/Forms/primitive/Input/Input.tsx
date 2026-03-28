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
        'w-full h-12 px-5 rounded-xl text-base',
        'placeholder:text-(--color-secondary-grey) placeholder:font-light placeholder:text-sm',
        'border border-(--color-secondary-outline)',
        'focus:outline-none focus:ring-0 focus:border-(--color-primary-black)',
        'disabled:bg-(--color-secondary-offwhite) disabled:cursor-not-allowed',
        'transition-colors',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
export default Input;
