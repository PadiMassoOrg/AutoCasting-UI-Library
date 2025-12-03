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
    <div className="w-full flex flex-col">
      {label && (
        <Label htmlFor={id} className={labelClassName + ' mb-2'}>
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
export default FormSelectField;
