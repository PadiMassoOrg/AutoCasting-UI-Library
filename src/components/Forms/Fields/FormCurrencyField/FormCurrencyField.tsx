import * as React from 'react';
import { clsx } from 'clsx';
import { CurrencyInput, Label } from '../../primitive';

type FormCurrencyFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  id: string;
  label?: string;
  error?: string;
  labelClassName?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (formattedValue: string, rawDigits: string) => void;
};

const FormCurrencyField = (allProps: FormCurrencyFieldProps) => {
  const hasValueProp = Object.prototype.hasOwnProperty.call(allProps, 'value');
  const { id, label, error, labelClassName, className, value, required, onValueChange, ...props } = allProps;
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

      <CurrencyInput
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={className}
        onValueChange={onValueChange}
        {...inputValueProps}
        {...props}
      />

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

export default FormCurrencyField;
