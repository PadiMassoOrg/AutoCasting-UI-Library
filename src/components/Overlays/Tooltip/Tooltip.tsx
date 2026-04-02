import { Fragment, cloneElement, isValidElement, useCallback, useLayoutEffect, useRef, useState, useId } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';

export type TooltipPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type TooltipProps = {
  children: React.ReactNode;
  title: string;
  position?: TooltipPosition;
  nudgeX?: number;
  nudgeY?: number;
};

type TooltipCoordinates = {
  left: number;
  top: number;
};

const TOOLTIP_GAP = 16;

const POSITION_STYLES: Record<
  TooltipPosition,
  {
    tailClassName: string;
    tailStyle: React.CSSProperties;
  }
> = {
  topLeft: {
    tailClassName: 'left-3 top-full',
    tailStyle: {
      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
    },
  },
  topRight: {
    tailClassName: 'right-3 top-full',
    tailStyle: {
      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
    },
  },
  bottomLeft: {
    tailClassName: 'left-3 bottom-full',
    tailStyle: {
      clipPath: 'polygon(50% 0, 0 100%, 100% 100%)',
    },
  },
  bottomRight: {
    tailClassName: 'right-3 bottom-full',
    tailStyle: {
      clipPath: 'polygon(50% 0, 0 100%, 100% 100%)',
    },
  },
};

function getTooltipCoordinates(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  position: TooltipPosition,
  nudgeX = 0,
  nudgeY = 0
): TooltipCoordinates {
  if (position === 'topLeft') {
    return {
      left: triggerRect.left + nudgeX,
      top: triggerRect.top - tooltipRect.height - TOOLTIP_GAP + nudgeY,
    };
  }

  if (position === 'topRight') {
    return {
      left: triggerRect.right - tooltipRect.width + nudgeX,
      top: triggerRect.top - tooltipRect.height - TOOLTIP_GAP + nudgeY,
    };
  }

  if (position === 'bottomLeft') {
    return {
      left: triggerRect.left + nudgeX,
      top: triggerRect.bottom + TOOLTIP_GAP + nudgeY,
    };
  }

  return {
    left: triggerRect.right - tooltipRect.width + nudgeX,
    top: triggerRect.bottom + TOOLTIP_GAP + nudgeY,
  };
}

export default function Tooltip({ children, title, position = 'topLeft', nudgeX = 0, nudgeY = 0 }: TooltipProps) {
  const tooltipId = useId();
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const tooltipRef = useRef<HTMLSpanElement | null>(null);
  const [open, setOpen] = useState(false);
  const [isPositioned, setIsPositioned] = useState(false);
  const [coordinates, setCoordinates] = useState<TooltipCoordinates>({ left: 0, top: 0 });
  const positionStyle = POSITION_STYLES[position];

  const updatePosition = useCallback(() => {
    const triggerElement = triggerRef.current;
    const tooltipElement = tooltipRef.current;

    if (!triggerElement || !tooltipElement) return;

    const nextCoordinates = getTooltipCoordinates(
      triggerElement.getBoundingClientRect(),
      tooltipElement.getBoundingClientRect(),
      position,
      nudgeX,
      nudgeY
    );

    setCoordinates((currentCoordinates) => {
      if (currentCoordinates.left === nextCoordinates.left && currentCoordinates.top === nextCoordinates.top) {
        return currentCoordinates;
      }

      return nextCoordinates;
    });

    setIsPositioned(true);
  }, [nudgeX, nudgeY, position]);

  useLayoutEffect(() => {
    if (!open) return;

    setIsPositioned(false);
    updatePosition();

    const handleViewportChange = () => updatePosition();

    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, true);

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange, true);
    };
  }, [open, updatePosition]);

  if (!title) {
    return <>{children}</>;
  }

  const trigger =
    isValidElement(children) && children.type !== Fragment
      ? cloneElement(children as React.ReactElement<Record<string, unknown>>, {
          'aria-describedby': open ? tooltipId : undefined,
        })
      : children;

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-flex max-w-full"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-describedby={!isValidElement(children) && open ? tooltipId : undefined}
      >
        {trigger}
      </span>

      {open
        ? createPortal(
            <span
              ref={tooltipRef}
              id={tooltipId}
              role="tooltip"
              aria-hidden="true"
              className={clsx('pointer-events-none fixed z-[1200] ', isPositioned ? 'opacity-100' : 'opacity-0')}
              style={{
                left: coordinates.left,
                top: coordinates.top,
              }}
            >
              <span
                className={clsx(
                  'relative block rounded-[10px] bg-(--color-primary-purple)',
                  'px-2.5 py-1.5 text-xs font-normal text-(--color-primary-white)',
                  'shadow-xl'
                )}
              >
                <span
                  className={clsx('absolute h-2 w-4 bg-inherit', positionStyle.tailClassName)}
                  style={positionStyle.tailStyle}
                  aria-hidden="true"
                />
                {title}
              </span>
            </span>,
            document.body
          )
        : null}
    </>
  );
}
