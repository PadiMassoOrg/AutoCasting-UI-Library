import { cloneElement, isValidElement, forwardRef } from 'react';
import { clsx } from 'clsx';
import { BUTTON_STRUCTURE } from '../../../../styles/style_constants';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'danger' | 'primaryOutline' | 'outline' | 'disabled';
  asChild?: boolean;
  className?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant = 'primary', asChild = false, children, ...rest } = props;
  const { disabled, ...delegated } = rest;

  const variantClasses = {
    primary: 'bg-(--color-primary-purple) text-(--color-primary-white) cursor-pointer',
    danger: 'bg-(--color-alert-error) text-(--color-primary-white) cursor-pointer',
    primaryOutline:
      'bg-(--color-primary-white) text-(--color-primary-purple) border border-(--color-primary-purple) cursor-pointer',
    outline:
      'bg-(--color-primary-white) text-(--color-primary-black) border border-(--color-secondary-outline) cursor-pointer',
    disabled: 'bg-(--color-secondary-disabled-grey) text-(--color-primary-white) cursor-not-allowed',
  };

  const effectiveVariant: keyof typeof variantClasses = disabled ? 'disabled' : variant;

  const baseLayout = 'inline-flex items-center justify-center leading-none align-middle rounded-lg';

  const hasBg = className?.includes('bg-');
  const hasText = className?.includes('text-');
  const hasFont = className?.includes('font-');

  const computedClass = clsx(
    BUTTON_STRUCTURE,
    baseLayout,
    'font-semibold text-base transition duration-300 ease-in-out',
    !hasBg && !hasText && !hasFont && variantClasses[effectiveVariant],
    className
  );

  if (asChild && isValidElement(children)) {
    type ChildProps = typeof children.props & { className?: string; disabled?: boolean };

    const childProps: Partial<ChildProps> = {
      className: clsx((children.props as { className?: string }).className, computedClass),
      ...(delegated as unknown as Partial<ChildProps>),
      disabled,
    };

    return cloneElement(children as React.ReactElement<ChildProps>, childProps);
  }

  return (
    <button ref={ref} className={computedClass} disabled={disabled} {...delegated}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
