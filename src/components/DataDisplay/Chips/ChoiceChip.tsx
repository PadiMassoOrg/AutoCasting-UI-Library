import { clsx } from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

export type ChoiceChipProps = {
  label: string;
  selected?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export default function ChoiceChip({ label, selected = false, className, type = 'button', ...rest }: ChoiceChipProps) {
  const isDisabled = Boolean(rest.disabled);

  return (
    <button
      type={type}
      className={clsx(
        'px-4 py-1 rounded-full whitespace-nowrap bg-transparent border-1',
        isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        selected
          ? 'text-(--color-primary-purple) border-(--color-primary-purple)'
          : 'text-(--color-secondary-grey-fonts) border-(--color-secondary-outline)',
        className
      )}
      aria-pressed={selected}
      {...rest}
    >
      {label}
    </button>
  );
}
