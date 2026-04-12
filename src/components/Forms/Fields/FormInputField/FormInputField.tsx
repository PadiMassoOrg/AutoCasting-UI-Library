import { Input, Label } from '../../primitive';
import { clsx } from 'clsx';

import * as React from 'react';
import EditableInput from '../../primitive/EditableInput/EditableInput';

type FormInputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  error?: string;
  labelClassName?: string;
  type?: 'text' | 'password' | 'email';
  editable?: boolean;
  onEdit?: () => void;
};

const FormInputField = (allProps: FormInputFieldProps) => {
  const hasValueProp = Object.prototype.hasOwnProperty.call(allProps, 'value');
  const {
    id,
    label,
    error,
    editable = false,
    onEdit,
    labelClassName,
    type = 'text',
    className,
    value,
    required,
    ...props
  } = allProps;
  const inputValueProps = hasValueProp ? { value: (value ?? '') as string } : {};

  return (
    <div className="w-full flex flex-col">
      {label && (
        <Label htmlFor={id} className={clsx('mb-2', labelClassName)}>
          {label}
          {required ? (
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          ) : null}
        </Label>
      )}

      {/* ----- Editable variant ----- */}
      {editable ? (
        <EditableInput
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={className}
          type={type}
          onEdit={onEdit}
          {...inputValueProps}
          {...props}
        />
      ) : (
        /* ----- Normal variant (la que ya tenías) ----- */
        <Input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={className}
          type={type}
          {...inputValueProps}
          {...props}
        />
      )}

      {/* Mensajes debajo */}
      <div className="min-h-[25px]">
        {error && (
          <Label id={`${id}-error`} variant="error" className="mt-0.4 pl-0.7">
            {error}
          </Label>
        )}
      </div>
    </div>
  );
};

export default FormInputField;
