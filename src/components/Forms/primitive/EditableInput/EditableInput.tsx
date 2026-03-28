import * as React from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { EditIcon } from '../../../Brand/Identity/Icons';

type EditableInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onEdit?: () => void;
  type?: 'text' | 'password' | 'email';
};

const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>(
  ({ className, value, onEdit, disabled, ...props }, ref) => {
    return (
      <div
        className={clsx(
          'w-full h-14 rounded-xl text-base',
          'border border-(--color-secondary-outline)',
          'focus:outline-none focus:ring-0 focus:border-(--color-primary-black)',
          disabled && 'bg-(--color-secondary-disabled-grey) cursor-not-allowed',
          'transition-colors',
          'flex items-stretch',
          className
        )}
      >
        <input
          value={value}
          ref={ref}
          disabled={disabled}
          className={clsx(
            'w-full h-full bg-transparent outline-none',
            'border-0 focus:ring-0',
            'px-5 py-3',
            'text-base placeholder:text-(--color-secondary-grey) placeholder:font-light placeholder:text-sm'
          )}
          {...props}
        />

        <div className={clsx('flex items-center border-l border-(--color-secondary-outline)', 'px-2')}>
          <button
            type="button"
            onClick={onEdit}
            disabled={disabled}
            className={clsx(
              'cursor-pointer inline-flex items-center justify-center rounded-full',
              'h-7 w-7',
              !disabled && 'active:bg-black/10',
              disabled && 'opacity-60 cursor-not-allowed'
            )}
          >
            <EditIcon></EditIcon>
          </button>
        </div>
      </div>
    );
  }
);

EditableInput.displayName = 'EditableInput';
export default EditableInput;
