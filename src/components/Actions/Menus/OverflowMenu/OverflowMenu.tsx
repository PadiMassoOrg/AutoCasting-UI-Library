import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type {
  OverflowMenuActionItem,
  OverflowMenuAlign,
  OverflowMenuContentItem,
  OverflowMenuItem,
  OverflowMenuSide,
} from './overflowmenu.types';
import { Icon } from '../../../Brand/Identity/Icon';

type Props = {
  items: OverflowMenuItem[];
  align?: OverflowMenuAlign;
  side?: OverflowMenuSide;
  offset?: number;
  triggerClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
  disabled?: boolean;
  trigger?: (ctx: { open: boolean; disabled: boolean }) => React.ReactNode;
};

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ');
}

function isActionItem(item: OverflowMenuItem): item is OverflowMenuActionItem {
  return item.type !== 'separator' && item.type !== 'content';
}

function isContentItem(item: OverflowMenuItem): item is OverflowMenuContentItem {
  return item.type === 'content';
}

function isVisibleItem(item: OverflowMenuItem) {
  return !('hidden' in item && item.hidden);
}

const OverflowMenu = ({
  items,
  align = 'end',
  side = 'bottom',
  offset = 8,
  triggerClassName,
  menuClassName,
  itemClassName,
  disabled = false,
  trigger,
}: Props) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  const visibleItems = useMemo(() => (items ?? []).filter(isVisibleItem), [items]);

  const close = useCallback(() => setOpen(false), []);
  const toggleOpen = useCallback(() => {
    if (disabled) return;
    setOpen((v) => !v);
  }, [disabled]);

  const measure = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();

    if (side === 'bottom') {
      setAnchor({
        x: align === 'end' ? r.right : r.left,
        y: r.bottom + offset,
      });
    } else {
      setAnchor({
        x: align === 'end' ? r.right : r.left,
        y: r.top - offset,
      });
    }
  }, [align, side, offset]);

  useEffect(() => {
    if (!open) return;
    measure();
  }, [open, measure]);

  useEffect(() => {
    if (!open) return;

    const onResize = () => close();

    const onScroll = (e: Event) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (menuRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      close();
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, true);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node | null;
      if (!t) return;

      const inTrigger = !!triggerRef.current?.contains(t);
      const inMenu = !!menuRef.current?.contains(t);

      if (!inTrigger && !inMenu) close();
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointerDown, true);
    document.addEventListener('touchstart', onPointerDown, true);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointerDown, true);
      document.removeEventListener('touchstart', onPointerDown, true);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) return;

    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as Node | null;
      if (!t) return;

      const inTrigger = !!triggerRef.current?.contains(t);
      const inMenu = !!menuRef.current?.contains(t);

      if (!inTrigger && !inMenu) close();
    };

    document.addEventListener('focusin', onFocusIn, true);

    return () => {
      document.removeEventListener('focusin', onFocusIn, true);
    };
  }, [open, close]);

  const onSelectItem = async (it: OverflowMenuItem) => {
    if (!isActionItem(it) || it.disabled) return;

    try {
      await it.onSelect?.();
    } finally {
      const closeOnSelect = it.closeOnSelect ?? true;
      if (closeOnSelect) close();
    }
  };

  const MenuRenderer =
    !open || !anchor
      ? null
      : createPortal(
          <div
            ref={menuRef}
            role="menu"
            className={cx(
              'fixed z-[999] min-w-[210px] rounded-2xl shadow-lg',
              'bg-(--color-primary-white) border border-(--color-secondary-outline)',
              'p-2',
              menuClassName
            )}
            style={{
              left: anchor.x,
              top: anchor.y,
              transform:
                align === 'end'
                  ? side === 'bottom'
                    ? 'translateX(-100%) translateY(0)'
                    : 'translateX(-100%) translateY(-100%)'
                  : side === 'bottom'
                    ? 'translateX(0) translateY(0)'
                    : 'translateX(0) translateY(-100%)',
            }}
          >
            {visibleItems.map((it) => {
              if (it.type === 'separator') {
                return <div key={it.key} className="my-2 h-px w-full bg-(--color-secondary-outline) opacity-60" />;
              }

              if (isContentItem(it)) {
                return (
                  <div key={it.key} className="p-2">
                    {it.content}
                  </div>
                );
              }

              const isDestructive = Boolean(it.destructive);
              const isDisabled = Boolean(it.disabled);

              const iconName = it.iconName;
              const forcedIconVariant = it.iconVariant;

              const resolvedIconVariant =
                forcedIconVariant ||
                (isDisabled ? 'disabled' : isDestructive ? 'danger' : hoverKey === it.key ? 'primary' : 'default');

              const labelNode = it.label;
              const isStringLabel = typeof labelNode === 'string';

              return (
                <button
                  key={it.key}
                  type="button"
                  role="menuitem"
                  data-menuitem="true"
                  disabled={isDisabled}
                  onClick={() => void onSelectItem(it)}
                  onMouseEnter={() => setHoverKey(it.key)}
                  onMouseLeave={() => setHoverKey(null)}
                  className={cx(
                    'w-full text-left px-3 py-2 rounded-xl',
                    'flex items-center gap-3',
                    'text-sm font-normal',
                    'cursor-pointer disabled:cursor-not-allowed',
                    isDestructive
                      ? 'text-(--color-alert-error) hover:bg-red-50'
                      : 'text-(--color-primary-black) hover:text-(--color-primary-purple) hover:bg-(--color-secondary-white)',
                    'transition-colors',
                    'disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit',
                    itemClassName
                  )}
                >
                  {iconName && <Icon name={iconName} variant={resolvedIconVariant} />}
                  {isStringLabel ? <span className="select-none">{labelNode}</span> : labelNode}
                </button>
              );
            })}
          </div>,
          document.body
        );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleOpen}
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={disabled}
        className={cx('disabled:opacity-50 disabled:cursor-not-allowed', triggerClassName)}
      >
        {trigger ? trigger({ open, disabled }) : <Icon name="overflowmenu" variant="default" />}
      </button>
      {MenuRenderer}
    </>
  );
};

export default OverflowMenu;
