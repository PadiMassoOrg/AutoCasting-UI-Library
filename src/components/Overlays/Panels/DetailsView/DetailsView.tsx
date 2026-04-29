import clsx from 'clsx';
import { type ReactNode, useEffect, useRef } from 'react';
import { Icon } from '../../../Brand/Identity/Icon';
import { Spinner } from '../../../Feedback/Loading/Spinner';

type DetailsViewProps = {
  open: boolean;
  onClose: () => void;
  headerLeft: ReactNode;
  headerRight?: ReactNode;
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
  headerRight,
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

  return (
    <div className="fixed inset-0 z-[140] flex justify-end items-stretch">
      {/* Overlay */}
      <button type="button" aria-label="Cerrar" onClick={onClose} className="absolute inset-0 bg-black/60" />

      {/* Panel derecho */}
      <aside
        className={clsx(
          'relative ml-auto h-full w-full max-w-[550px] bg-(--color-secondary-white) shadow-xl flex flex-col',
          className
        )}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-5 border-b border-(--color-secondary-outline) bg-(--color-primary-white)">
          {resolvedHeaderLeft}
          <div className="flex items-center gap-4">
            {headerRight}
            <Icon name="burgerClose" onClick={onClose} />
          </div>
        </header>

        {/* Body scrolleable */}
        <div ref={bodyRef} className="flex-1 min-h-0 overflow-auto px-8 py-10">
          {showLoading ? (
            <div className="w-full h-full min-h-[220px] flex items-center justify-center">
              <Spinner className="h-8 w-8" />
            </div>
          ) : (
            children
          )}
        </div>
      </aside>
    </div>
  );
}
