import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { Label } from '../primitive';

export type TextareaFieldProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'required'> & {
  id: string;
  label?: string;
  error?: string | null;
  labelClassName?: string;
  wrapperClassName?: string;
  textareaClassName?: string;
  minHeightClassName?: string;
  required?: boolean;
};

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(function TextareaField(
  {
    id,
    label,
    error,
    disabled,
    placeholder,
    required = false,
    labelClassName = 'text-sm font-semibold',
    wrapperClassName = 'w-full flex flex-col',
    textareaClassName,
    minHeightClassName = 'min-h-36',
    value,
    className,
    ...rest
  },
  ref
) {
  const base = `
      w-full ${minHeightClassName} px-5 py-2.5 rounded-xl text-base
      placeholder:text-[var(--color-secondary-grey)] placeholder:font-light placeholder:text-sm
      border border-[var(--color-secondary-outline)]
      focus:outline-none focus:ring-0 focus:border-[var(--color-primary-black)]
      disabled:bg-[var(--color-secondary-offwhite)] disabled:cursor-not-allowed
      transition-colors
    `
    .replace(/\s+/g, ' ')
    .trim();

  const cls = clsx(base, className, textareaClassName);
  const hasValueProp = Object.prototype.hasOwnProperty.call(rest, 'value') || value !== undefined;
  const valueProps = hasValueProp ? { value: (value ?? '') as string } : {};

  return (
    <div className={wrapperClassName}>
      {label ? (
        <Label htmlFor={id} className={clsx('mb-2', labelClassName)}>
          {label}
          {required ? (
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          ) : null}
        </Label>
      ) : null}

      <textarea
        ref={ref}
        id={id}
        className={cls}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder={placeholder}
        disabled={disabled}
        {...valueProps}
        {...rest}
      />

      <div className="min-h-[25px] overflow-visible">
        {error ? (
          <Label id={`${id}-error`} variant="error" className="mt-0.4 pl-0.7 inline-block whitespace-nowrap">
            {error}
          </Label>
        ) : null}
      </div>
    </div>
  );
});

export default TextareaField;
