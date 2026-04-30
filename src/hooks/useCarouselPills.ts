import { useMemo, useState } from 'react';

export type PillKeyBase = string;

export type CountGetters<K extends PillKeyBase, D> = Partial<Record<K, (data: D) => number | undefined>>;

export function useCarouselPills<K extends PillKeyBase, D>(params: {
  order: readonly K[];
  labels: Record<K, string>;
  data: D;
  getCount?: CountGetters<K, D>;
  defaultActive?: K;
}) {
  const { order, labels, data, getCount, defaultActive = order[0] } = params;

  const [active, setActive] = useState<K>(defaultActive);

  const pills = useMemo(
    () =>
      order.map((key) => ({
        key,
        label: labels[key],
        count: getCount?.[key]?.(data),
      })),
    [order, labels, data, getCount]
  );

  return { active, setActive, pills };
}
