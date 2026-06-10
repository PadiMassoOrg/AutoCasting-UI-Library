import clsx from 'clsx';
import { type ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../../../Brand/Identity/Icon';
import { Spinner } from '../../../Feedback/Loading/Spinner';

type DetailsViewProps = {
  open: boolean;
  onClose: () => void;
  headerLeft: ReactNode;
  bottomBar?: ReactNode;
  children?: ReactNode;
  className?: string;
  loading?: boolean;
  isLoading?: boolean;
  loadingHeaderHeightClassName?: string;
};

export default function DetailsView({
  open,
  onClose,
  headerLeft: navigation,
  bottomBar,
  children,
  className,
  loading = false,
  isLoading = false,
  loadingHeaderHeightClassName = 'h-8',
}: DetailsViewProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 1) Panel: siempre arrancar desde arriba
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
      bodyRef.current.scrollLeft = 0;
    }

    // 2) Root de la app (por si también querés que la pantalla general esté en top)
    const root = document.querySelector<HTMLElement>('#app-scroll-root');
    if (root) {
      root.scrollTop = 0;
      root.scrollLeft = 0;
    } else {
      // fallback
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const showLoading = loading || isLoading;
  const resolvedHeaderLeft = showLoading ? <div className={loadingHeaderHeightClassName} /> : navigation;

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-200" style={{ overscrollBehavior: 'contain' }}>
      {/* Overlay */}
      <button type="button" aria-label="Cerrar" onClick={onClose} className="absolute inset-0 bg-black/40" />

      {/* Panel */}
      <aside
        className={clsx(
          'fixed right-[10px] top-[10px] bottom-[10px] left-[10px] flex flex-col overflow-hidden rounded-xl bg-white lg:left-auto lg:w-full lg:max-w-[550px]',
          className
        )}
      >
        {/* Each element handles own paddings: General rule p-6 */}

        {/* Header */}
        <header className="py-4 px-6 flex items-start justify-between gap-6 border-b border-(--color-secondary-outline) bg-(--color-primary-white)">
          <div className="min-w-0 flex-1">{resolvedHeaderLeft}</div>
          <button type="button" aria-label="Cerrar" onClick={onClose} className="cursor-pointer">
            <Icon name="burgerClose" />
          </button>
        </header>

        {/* Body scrolleable */}
        <div ref={bodyRef} className="px-6 py-6 flex-1 min-h-0 overflow-auto bg-[var(--color-secondary-white)]">
          {showLoading ? (
            <div className="w-full h-full min-h-[220px] flex items-center justify-center">
              <Spinner className="h-8 w-8" />
            </div>
          ) : (
            children
          )}
        </div>

        {bottomBar ? (
          <footer className="shrink-0 bg-(--color-primary-white) px-6 py-4 shadow-[0_-2px_3px_rgba(0,0,0,0.1)]">
            {bottomBar}
          </footer>
        ) : null}
      </aside>
    </div>,
    document.body
  );
}
