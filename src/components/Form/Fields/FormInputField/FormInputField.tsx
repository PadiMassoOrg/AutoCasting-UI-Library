import { Input, Label } from '../../primitive';

type FormInputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  error?: string;
  type?: 'text' | 'password' | 'email';
};

const FormInputField = ({ id, label, error, type, className, ...props }: FormInputFieldProps) => {
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={className}
        type={type}
        {...props}
      />
      {error && (
        <Label id={`${id}-error`} variant="error">
          {error}
        </Label>
      )}
    </div>
  );
};

export default FormInputField;
