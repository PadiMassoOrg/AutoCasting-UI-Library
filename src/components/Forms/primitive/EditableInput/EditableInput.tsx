import * as React from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Icon } from '../../../Brand/Identity/Icon';
import Input from '../Input';

type EditableInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onEdit?: () => void;
  type?: 'text' | 'password' | 'email';
};

const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>((allProps, ref) => {
  const hasValueProp = Object.prototype.hasOwnProperty.call(allProps, 'value');
  const { className, value, onEdit, disabled, ...props } = allProps;
  const canEdit = !disabled && !!onEdit;
  const inputValueProps = hasValueProp ? { value: (value ?? '') as string } : {};

  return (
    <div
      className={clsx(
        'w-full h-12 flex items-stretch rounded-xl border border-(--color-secondary-outline) overflow-hidden',
        disabled && 'bg-(--color-secondary-offwhite) cursor-not-allowed'
      )}
    >
      <Input
        ref={ref}
        disabled={disabled}
        className={clsx(
          'h-full rounded-none border-0 focus:border-0 focus:ring-0',
          disabled && 'bg-transparent',
          className
        )}
        {...inputValueProps}
        {...props}
      />

      <div className={clsx('flex items-center justify-center border-l border-(--color-secondary-outline)', 'px-4')}>
        <button
          type="button"
          onClick={onEdit}
          disabled={!canEdit}
          aria-label="Edit field"
          className="inline-flex items-center justify-center disabled:cursor-not-allowed"
        >
          <Icon name="edit" variant={canEdit ? 'default' : 'disabled'}></Icon>
        </button>
      </div>
    </div>
  );
});

EditableInput.displayName = 'EditableInput';
export default EditableInput;
