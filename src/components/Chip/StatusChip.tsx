type StatusChipVariant = 'bordered' | 'inline';
type StatusChipAlign = 'inline' | 'spaced';

export type StatusChipProps = {
  label: string;
  dotColor?: string | null;
  variant?: StatusChipVariant;
  align?: StatusChipAlign;
  className?: string;
};

export default function StatusChip({
  label,
  dotColor,
  variant = 'bordered',
  align = 'inline',
  className,
}: StatusChipProps) {
  const baseClasses = 'inline-flex items-center gap-2';
  const borderedClasses =
    'rounded-xl border px-3 py-1 bg-[var(--color-primary-white)] border-[var(--color-secondary-outline)] text-[var(--color-primary-black)]';
  const inlineClasses = 'text-[var(--color-primary-black)]';
  const alignClasses = align === 'spaced' ? 'w-full justify-between' : '';

  return (
    <span
      className={[
        baseClasses,
        alignClasses,
        variant === 'bordered' ? borderedClasses : inlineClasses,
        className ?? '',
      ].join(' ')}
    >
      <span className="text-sm">{label}</span>
      {dotColor ? (
        <span
          className="inline-block h-4 w-4 shrink-0 rounded-full"
          style={{ background: dotColor }}
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
}
