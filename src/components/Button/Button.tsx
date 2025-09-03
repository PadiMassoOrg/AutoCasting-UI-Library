import { clsx } from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'danger' | 'disabled';
};

const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
  const variantClasses = {
    primary: 'bg-[var(--color-primary-black)] text-[var(--color-primary-white)]',
    outline:
      'bg-[var(--color-primary-white)] text-[var(--color-primary-black)] border border-[var(--color-secondary-outline)]',
    danger: 'bg-[var(--color-secondary-offblack)] text-[var(--color-primary-white)]',
    disabled: 'bg-[var(--color-secondary-disabled-grey)] text-[var(--color-primary-white)] cursor-default',
  };

  const hasBg = className?.includes('bg-');
  const hasText = className?.includes('text-');
  const hasFont = className?.includes('font-');

  return (
    <button
      className={clsx(
        'w-full h-14 px-6 py-3 rounded-full font-semibold text-base text-center cursor-pointer transition duration-300 ease-in-out',
        !hasBg && !hasText && !hasFont && variantClasses[variant],
        className
      )}
      {...props}
    />
  );
};

export default Button;
