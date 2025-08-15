import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

export type SelectOption = { value: string; label: string; disabled?: boolean };
type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'multiple' | 'size'> & {
  options?: SelectOption[];
  placeholder?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={clsx(
            'w-full h-14 px-6 py-3 rounded-xl text-sm',
            'placeholder:text-[var(--color-secondary-grey)] placeholder:font-light',
            'border border-[var(--color-secondary-outline)]',
            'focus:outline-none focus:ring-2 focus:ring-black/10',
            'appearance-none',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((o) => (
                <option key={o.value} value={o.value} disabled={o.disabled}>
                  {o.label}
                </option>
              ))
            : children}
        </select>

        <svg
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </svg>
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
