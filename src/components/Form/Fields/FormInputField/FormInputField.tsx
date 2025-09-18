// FormInputField.tsx
import { Input, Label } from '../../primitive';

type FormInputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  error?: string;
  labelClassName?: string;
  type?: 'text' | 'password' | 'email';
};

const FormInputField = ({ id, label, error, labelClassName, type, className, ...props }: FormInputFieldProps) => {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <Label htmlFor={id} className={labelClassName + ' mb-1'}>
          {label}
        </Label>
      )}
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={className}
        type={type}
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
export default FormInputField;
