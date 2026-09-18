import { type CountGetters, type PillKeyBase, useCarouselPills } from '../../../hooks/useCarouselPills';
import { Pills } from '../../Navigation/Selection/Pills';
import React from 'react';

type Renderers<K extends PillKeyBase, D> = Record<K, (data: D) => React.ReactNode>;

type InfoCarouselProps<K extends PillKeyBase, D> = {
  data: D;
  order: readonly K[];
  labels: Record<K, string>;
  renderers: Renderers<K, D>;
  getCount?: CountGetters<K, D>;
  className?: string;
  panelWrapperClassName?: string;
  defaultActive?: K;
  fixedHeight?: boolean;
  /** Overrides the card's height so its content area (excluding the card's own py-6 padding) is exactly this px value. */
  panelHeightPx?: number;
};

export default function InfoCarousel<K extends PillKeyBase, D>({
  data,
  order,
  labels,
  renderers,
  getCount,
  className,
  panelWrapperClassName,
  defaultActive,
  fixedHeight = false,
  panelHeightPx,
}: InfoCarouselProps<K, D>) {
  const { active, setActive, pills } = useCarouselPills<K, D>({
    order,
    labels,
    data,
    getCount,
    defaultActive,
  });

  const ActivePanel = renderers[active];
  const PANEL_VERTICAL_PADDING_PX = 48; // py-6 (24px) on top + bottom of the scroll wrapper below

  return (
    <section className={`w-full min-w-0 h-full min-h-0 flex flex-col gap-3 ${className ?? ''}`}>
      <Pills items={pills} value={active} onChange={setActive} listClassName="pb-1" />

      <div className={`w-full flex-1 min-h-0 overflow-hidden rounded-xl ${panelWrapperClassName ?? ''}`}>
        <div
          className={`${panelHeightPx === undefined ? `h-full ${fixedHeight ? 'min-h-[645px]' : 'min-h-[min(645px,100%)]'}` : ''} rounded-xl ring-1 ring-inset ring-[var(--color-secondary-outline)] bg-white`}
          style={panelHeightPx !== undefined ? { height: panelHeightPx + PANEL_VERTICAL_PADDING_PX } : undefined}
        >
          <div className="h-full min-h-0 overflow-auto py-6 px-7">{ActivePanel?.(data)}</div>
        </div>
      </div>
    </section>
  );
}
