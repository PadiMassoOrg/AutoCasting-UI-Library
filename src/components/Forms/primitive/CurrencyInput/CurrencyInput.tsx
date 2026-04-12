import * as React from 'react';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import Input from '../Input';

type CurrencyInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (formattedValue: string, rawDigits: string) => void;
};

function extractDigits(value?: string | null): string {
  return (value ?? '').replace(/\D/g, '');
}

function addThousandsSeparator(intPart: string): string {
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function formatDigitsAsCurrency(digits: string): string {
  if (!digits) return '';

  const normalized = digits.replace(/^0+(?=\d)/, '');
  const padded = normalized.padStart(3, '0');
  const integerPart = addThousandsSeparator(padded.slice(0, -2));
  const decimalPart = padded.slice(-2);
  return `${integerPart},${decimalPart}`;
}

function normalizeCurrencyText(value?: string): string {
  return formatDigitsAsCurrency(extractDigits(value));
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>((allProps, ref) => {
  const hasValueProp = Object.prototype.hasOwnProperty.call(allProps, 'value');
  const { value, defaultValue, onChange, onValueChange, ...props } = allProps;

  const controlledValue = useMemo(() => normalizeCurrencyText(value), [value]);
  const initialValue = useMemo(() => normalizeCurrencyText(defaultValue), [defaultValue]);
  const [uncontrolledValue, setUncontrolledValue] = useState(initialValue);

  useEffect(() => {
    if (!hasValueProp) {
      setUncontrolledValue(initialValue);
    }
  }, [hasValueProp, initialValue]);

  const displayValue = hasValueProp ? controlledValue : uncontrolledValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatDigitsAsCurrency(extractDigits(event.target.value));
    const nextDigits = extractDigits(formattedValue);

    if (!hasValueProp) {
      setUncontrolledValue(formattedValue);
    }

    onValueChange?.(formattedValue, nextDigits);

    if (onChange) {
      const nextEvent = {
        ...event,
        target: { ...event.target, value: formattedValue },
        currentTarget: { ...event.currentTarget, value: formattedValue },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(nextEvent);
    }
  };

  return (
    <Input
      ref={ref}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      value={displayValue}
      onChange={handleChange}
      {...props}
    />
  );
});

CurrencyInput.displayName = 'CurrencyInput';

export default CurrencyInput;
