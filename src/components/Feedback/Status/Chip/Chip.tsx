import { Icon } from '../../../Brand/Identity/Icon';

type ChipProps = {
  label: string;
  onRemove?: () => void;
  newItem?: boolean;
};

export default function Chip({ label, onRemove, newItem = false }: ChipProps) {
  return (
    <span
      className={[
        'flex items-center gap-[6px] rounded-xl border px-3 py-1 lg:text-[14px]',
        newItem
          ? 'font-semibold bg-(--color-secondary-white) border-(--color-primary-purple) text-(--color-primary-purple)'
          : 'bg-(--color-primary-white) border-(--color-secondary-outline) text-(--color-primary-black)',
      ].join(' ')}
    >
      <p className="text-sm">{label}</p>
      {onRemove && <Icon name="cross" variant="primary" size={11} onClick={onRemove} />}
    </span>
  );
}
