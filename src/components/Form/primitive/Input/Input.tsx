import { forwardRef } from 'react';
import { clsx } from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', ...props }, ref) => {
  return <input type={type} ref={ref} className={clsx('input-primary', className)} {...props} />;
});

Input.displayName = 'Input';
export default Input;
