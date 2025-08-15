// FormSelectField.tsx
import React from 'react';
import Select, { SelectOption } from '../../primitive/Select/Select';
import { Label } from '../../primitive';

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label?: string;
  error?: string;
  labelClassName?: string;
  placeholder?: string;
  options?: SelectOption[];
};

const FormSelectField = ({ id, label, labelClassName, error, placeholder, options, className, ...props }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <Label htmlFor={id} className={labelClassName}>
          {label}
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
      {error && (
        <Label id={`${id}-error`} variant="error" className="mt-0.5 pl-0.5">
          {error}
        </Label>
      )}
    </div>
  );
};
export default FormSelectField;
