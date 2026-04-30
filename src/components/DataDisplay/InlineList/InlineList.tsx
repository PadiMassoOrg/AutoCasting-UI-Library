import type { JSX } from 'react';

export type InlineListItem = {
  id: string | number;
  label: string;
};

type InlineListProps = {
  items: InlineListItem[];
  quantity?: number;
  separator?: string;
  className?: string;
};

export default function InlineList({ items: list, quantity = 2, separator = '•', className = '' }: InlineListProps) {
  const normalized = (list ?? []).filter(Boolean);
  if (normalized.length === 0) return null;

  const q = Math.max(1, quantity);
  const sliced = normalized.slice(0, q);

  return (
    <span
      className={`flex flex-wrap items-center gap-1 text-sm font-normal text-[var(--color-secondary-grey)] line-clamp-1 ${className}`}
    >
      {sliced.reduce<JSX.Element[]>((acc, curr, index) => {
        if (index === 0) return [<span key={curr.id}>{curr.label}</span>];
        return [...acc, <span key={`sep-${index}`}>{separator}</span>, <span key={curr.id}>{curr.label}</span>];
      }, [])}
    </span>
  );
}
