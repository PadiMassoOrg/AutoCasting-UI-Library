import type { CSSProperties } from 'react';
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
      className={[
        'inline-flex items-center gap-[6px] rounded-xl border px-3 py-1 lg:text-[14px]',
        newItem
          ? 'font-semibold bg-(--color-secondary-white) border-(--color-primary-purple) text-(--color-primary-purple)'
          : 'bg-(--color-primary-white) border-(--color-secondary-outline) text-(--color-primary-black)',
        className,
      ].join(' ')}
      style={style}
    >
      <p className="text-sm">{label}</p>
      {onRemove && <Icon name="cross" variant="primary" size={11} onClick={onRemove} />}
    </span>
  );
}
