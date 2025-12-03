/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { cloneElement, isValidElement, forwardRef } from 'react';
import { clsx } from 'clsx';
import { BUTTON_STRUCTURE } from '../../styles/style_constants';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'accent' | 'primaryOutline' | 'outline' | 'disabled';
  asChild?: boolean;
  className?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', asChild = false, children, ...rest }, ref) => {
    const variantClasses = {
      primary: 'bg-[var(--color-primary-purple)] text-[var(--color-primary-white)] cursor-pointer',
      accent: 'bg-[var(--color-primary-greenyellow)] text-[var(--color-primary-white)] cursor-pointer',
      primaryOutline:
        'bg-[var(--color-primary-white)] text-[var(--color-primary-purple)] border border-[var(--color-primary-purple)] cursor-pointer',
      outline:
        'bg-[var(--color-primary-white)] text-[var(--color-primary-black)] border border-[var(--color-secondary-outline)] cursor-pointer',
      disabled: 'bg-[var(--color-secondary-disabled-grey)] text-[var(--color-primary-white)] cursor-default',
    };

    const baseLayout = 'inline-flex items-center justify-center leading-none align-middle';

    const hasBg = className?.includes('bg-');
    const hasText = className?.includes('text-');
    const hasFont = className?.includes('font-');

    const computedClass = clsx(
      BUTTON_STRUCTURE,
      baseLayout,
      'font-semibold text-base transition duration-300 ease-in-out',
      !hasBg && !hasText && !hasFont && variantClasses[variant],
      className
    );

    if (asChild && isValidElement(children)) {
      type ChildProps = typeof children.props & { className?: string };

      const { type: _type, disabled: _disabled, ...safeRest } = rest;

      const childProps: Partial<ChildProps> = {
        className: clsx((children.props as { className?: string }).className, computedClass),
        ...(safeRest as unknown as Partial<ChildProps>),
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

export default Button;
