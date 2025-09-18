import React, { cloneElement, isValidElement, forwardRef } from 'react';
import { clsx } from 'clsx';
import { BUTTON_STRUCTURE } from '../../styles/style_constants';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'disabled';
  asChild?: boolean;
  className?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', asChild = false, children, ...rest }, ref) => {
    const variantClasses = {
      primary: 'bg-[var(--color-primary-black)] text-[var(--color-primary-white)] cursor-pointer',
      outline:
        'bg-[var(--color-primary-white)] text-[var(--color-primary-black)] border border-[var(--color-secondary-outline)] cursor-pointer',
      disabled: 'bg-[var(--color-secondary-disabled-grey)] text-[var(--color-primary-white)] cursor-default',
    };

    const hasBg = className?.includes('bg-');
    const hasText = className?.includes('text-');
    const hasFont = className?.includes('font-');

    const computedClass = clsx(
      BUTTON_STRUCTURE,
      'font-semibold text-base transition duration-300 ease-in-out',
      !hasBg && !hasText && !hasFont && variantClasses[variant],
      className
    );

    if (asChild && isValidElement(children)) {
      type ChildProps = typeof children.props & { className?: string };
      const childProps: Partial<ChildProps> = {
        className: clsx((children.props as { className?: string }).className, computedClass),
        ...(rest as unknown as Partial<ChildProps>),
      };
      return cloneElement(children as React.ReactElement<ChildProps>, childProps);
    }

    return (
      <button ref={ref} className={computedClass} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
