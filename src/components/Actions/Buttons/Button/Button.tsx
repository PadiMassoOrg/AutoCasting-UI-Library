import { cloneElement, isValidElement, forwardRef } from 'react';
import { clsx } from 'clsx';
import { BUTTON_STRUCTURE } from '../../../../styles/style_constants';
import { Spinner } from '../../../Feedback/Loading/Spinner';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'danger' | 'primaryOutline' | 'outline' | 'disabled';
  asChild?: boolean;
  className?: string;
  loading?: boolean;
  loadingText?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = 'primary',
    asChild = false,
    children,
    type,
    loading = false,
    loadingText,
    ...rest
  } = props;
  const { disabled, ...delegated } = rest;
  const isDisabled = disabled || loading;

  const variantClasses = {
    primary: 'bg-(--color-primary-purple) text-(--color-primary-white) cursor-pointer hover:bg-(--hover-color-primary)',
    danger: 'bg-(--color-alert-error) text-(--color-primary-white) cursor-pointer hover:bg-(--hover-color-danger)',
    primaryOutline:
      'bg-(--color-primary-white) text-(--color-primary-purple) border border-(--color-primary-purple) cursor-pointer hover:border-(--hover-color-primary-outline) hover:text-(--hover-color-primary-outline)',
    outline:
      'bg-(--color-primary-white) text-(--color-primary-black) border border-(--color-secondary-outline) cursor-pointer hover:border-(--hover-color-outline) hover:text-(--hover-color-outline)',
    disabled: 'bg-(--color-secondary-disabled-grey) text-(--color-primary-white) cursor-not-allowed',
  };

  const effectiveVariant: keyof typeof variantClasses = isDisabled ? 'disabled' : variant;

  const baseLayout = 'inline-flex items-center justify-center leading-none align-middle rounded-lg';

  const computedClass = clsx(
    BUTTON_STRUCTURE,
    baseLayout,
    'font-semibold text-base transition duration-300 ease-in-out',
    variantClasses[effectiveVariant],
    className
  );

  if (asChild && isValidElement(children)) {
    type ChildProps = typeof children.props & { className?: string; disabled?: boolean };

    const childProps: Partial<ChildProps> = {
      className: clsx((children.props as { className?: string }).className, computedClass),
      ...(delegated as unknown as Partial<ChildProps>),
      disabled: isDisabled,
    };

    return cloneElement(children as React.ReactElement<ChildProps>, childProps);
  }

  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={computedClass}
      disabled={isDisabled}
      aria-busy={loading}
      {...delegated}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <Spinner className="h-4 w-4" strokeWidth={2.5} ariaLabel={loadingText ?? 'Loading'} />
          {loadingText ?? children}
        </span>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
