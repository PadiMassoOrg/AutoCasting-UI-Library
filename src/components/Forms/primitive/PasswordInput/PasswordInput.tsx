import * as React from 'react';
import { forwardRef, useState } from 'react';
import { clsx } from 'clsx';
import { Icon } from '../../../Brand/Identity/Icon';
import Input from '../Input';

type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type?: 'password';
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const { className, disabled, ...rest } = props;
  const [revealed, setRevealed] = useState(false);

  const toggleReveal = () => {
    if (disabled) return;
    setRevealed((prev) => !prev);
  };

  return (
    <div
      className={clsx(
        'w-full h-12 flex items-stretch rounded-xl border border-(--color-secondary-outline) overflow-hidden',
        disabled && 'bg-(--color-secondary-offwhite) cursor-not-allowed'
      )}
    >
      <Input
        ref={ref}
        type={revealed ? 'text' : 'password'}
        disabled={disabled}
        className={clsx(
          'h-full rounded-none border-0 focus:border-0 focus:ring-0',
          disabled && 'bg-transparent',
          className
        )}
        {...rest}
      />

      <div className="flex items-center justify-center border-l border-(--color-secondary-outline) px-4">
        <button
          type="button"
          onClick={toggleReveal}
          disabled={disabled}
          aria-label={revealed ? 'Hide password' : 'Show password'}
          className="inline-flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icon name={revealed ? 'viewHide' : 'view'} variant="default" />
        </button>
      </div>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
