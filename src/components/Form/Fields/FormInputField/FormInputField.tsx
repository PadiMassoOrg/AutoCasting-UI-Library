import { Input, Label } from '../../primitive';

type FormInputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  error?: string;
};

const FormInputField = ({ id, label, error, className, ...props }: FormInputFieldProps) => {
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={className}
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
