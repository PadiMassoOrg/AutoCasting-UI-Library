import type { CSSProperties } from 'react';
import { clsx } from 'clsx';
import { Icon } from '../../Brand/Identity/Icon';

export type TagChipProps = {
  label: string;
  onRemove?: () => void;
  newItem?: boolean;
  className?: string;
  style?: CSSProperties;
};

export default function TagChip({ label, onRemove, newItem = false, className, style }: TagChipProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-full border-1 bg-(--color-primary-white) px-4 py-1 text-sm lg:text-[14px]',
        newItem
          ? 'border-(--color-primary-purple) text-(--color-primary-purple)'
          : 'border-(--color-secondary-outline) text-(--color-secondary-grey-fonts)',
        className
      )}
      style={style}
    >
      <span>{label}</span>
      {onRemove && <Icon name="cross" variant={newItem ? 'primary' : 'default'} size={11} onClick={onRemove} />}
    </span>
  );
}
