import clsx from 'clsx';
import { useState } from 'react';
import { Icon } from '../../../Brand/Identity/Icon';
import type { IconName } from '../../../Brand/Identity/Icon';

type IconViewSwitcherProps<T extends IconName> = {
  items: T[];
  onChange?: (next: T) => void;
  className?: string;
  innerClassName?: string;
  itemClassName?: string;
  disabled?: boolean;
  defaultSelected?: T;
};

export default function IconViewSwitcher<T extends IconName>({
  items,
  onChange,
  className,
  innerClassName,
  itemClassName,
  disabled = false,
  defaultSelected,
}: IconViewSwitcherProps<T>) {
  if (!items?.length) return null;

  const initial = defaultSelected && items.includes(defaultSelected) ? defaultSelected : items[0];
  const [selected, setSelected] = useState<T>(initial);
  const [hovered, setHovered] = useState<T | null>(null);

  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={clsx(
          'inline-flex items-center justify-center rounded-xl bg-white shadow-sm h-11 p-1',
          innerClassName
        )}
      >
        {items.map((item) => {
          const isActive = item === selected;
          const isDisabled = disabled;

          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={isDisabled}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                if (isDisabled || isActive) return;
                setSelected(item);
                onChange?.(item);
              }}
              className={clsx(
                'cursor-pointer h-9 min-w-9 px-3 rounded-xl',
                'inline-flex items-center justify-center',
                'transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                isActive || hovered === item ? 'bg-(--color-secondary-white)' : 'bg-transparent',
                itemClassName
              )}
            >
              <Icon name={item} variant={isActive || hovered === item ? 'primary' : 'default'} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
