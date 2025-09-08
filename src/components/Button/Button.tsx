import { clsx } from 'clsx';
import { BUTTON_STRUCTURE } from '../../styles/style_constants';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'disabled';
};

const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
  const variantClasses = {
    primary: 'bg-[var(--color-primary-black)] text-[var(--color-primary-white)] cursor-pointer',
    outline:
      'bg-[var(--color-primary-white)] text-[var(--color-primary-black)] border border-[var(--color-secondary-outline)] cursor-pointer',
    disabled: 'bg-[var(--color-secondary-disabled-grey)] text-[var(--color-primary-white)] cursor-default',
  };

  const hasBg = className?.includes('bg-');
  const hasText = className?.includes('text-');
  const hasFont = className?.includes('font-');

  return (
    <button
      className={clsx(
        BUTTON_STRUCTURE,
        'font-semibold text-base transition duration-300 ease-in-out',
        !hasBg && !hasText && !hasFont && variantClasses[variant],
        className
      )}
      {...props}
    />
  );
};

export default Button;
