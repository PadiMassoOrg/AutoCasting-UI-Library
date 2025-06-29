import { clsx } from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'disabled';
};

const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
  const variantClasses = {
    primary: 'bg-[var(--color-primary-black)] text-[var(--color-primary-white)]',
    secondary: 'bg-[var(--color-primary-white)] text-[var(--color-primary-black)]',
    danger: 'bg-[var(--color-secondary-offblack)] text-[var(--color-primary-white)]',
    disabled: 'bg-[var(---color-secondary-grey)] text-[var(--color-primary-white)]',
  };

  const hasBg = className?.includes('bg-');
  const hasText = className?.includes('text-');

  return (
    <button
      className={clsx(
        'w-full h-14 px-6 py-3 rounded-2xl font-extrabold text-base text-center',
        !hasBg && !hasText && variantClasses[variant],
        className
      )}
      {...props}
    />
  );
};

export default Button;
