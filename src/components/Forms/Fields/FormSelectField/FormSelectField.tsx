import React from 'react';
import Select, { type SelectOption } from '../../primitive/Select/Select';
import { Label } from '../../primitive';

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label?: string;
  error?: string;
  labelClassName?: string;
  placeholder?: string;
  options?: SelectOption[];
};

const FormSelectField = ({
  id,
  label,
  labelClassName,
  error,
  placeholder,
  options,
  className,
  required,
  ...props
}: Props) => {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <Label htmlFor={id} className={labelClassName + ' mb-2'}>
          {label}
          {required ? (
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          ) : null}
        </Label>
      )}
      <Select
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={className}
        placeholder={placeholder}
        options={options}
        {...props}
      />
      <div className="min-h-[25px] overflow-visible">
        {error && (
          <Label id={`${id}-error`} variant="error" className="mt-0.4 pl-0.7 inline-block whitespace-nowrap">
            {error}
          </Label>
        )}
      </div>
    </div>
  );
};
export default FormSelectField;
