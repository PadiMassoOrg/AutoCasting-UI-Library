import { ReactNode, useEffect, useState } from 'react';

type ModalSize = 'auto' | 'sm' | 'md' | 'lg' | 'xl' | 'xl_2' | 'xl_3';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  // Hooks siempre arriba
  const [scrolled, setScrolled] = useState(false);

  // Bloquea el scroll del body solo si está abierto
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const sizeClasses: Record<ModalSize, string> = {
    auto: 'w-auto',
    sm: 'max-w-sm w-full',
    md: 'max-w-md w-full',
    lg: 'max-w-lg w-full',
    xl: 'max-w-xl w-full',
    xl_2: 'max-w-2xl w-full',
    xl_3: 'max-w-3xl w-full',
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-1000
        flex items-center justify-center
        p-4 sm:p-6 md:p-8
        bg-black/60
      "
      role="dialog"
      aria-modal="true"
    >
      {/* Wrapper con borde redondeado y CLIPPING */}
      <div
        className={`
          relative bg-(--color-primary-white) rounded-2xl shadow-2xl
          ${sizeClasses[size]}
          overflow-hidden
        `}
      >
        {/* Contenedor scrolleable interno (la scrollbar queda recortada por el borde) */}
        <div
          className="overflow-y-auto modal-scroll"
          style={{
            // Alto máx. usando viewport visible + safe areas + margen exterior (2rem)
            maxHeight: 'calc(100dvh - max(env(safe-area-inset-top),0px) - max(env(safe-area-inset-bottom),0px) - 2rem)',
          }}
          onScroll={(e) => setScrolled((e.currentTarget.scrollTop || 0) > 5)}
        >
          {/* Header sticky con sombra dinámica cuando hay scroll */}
          {(title || true) && (
            <div
              className={`
                sticky top-0 z-10 bg-(--color-primary-white)/95 backdrop-blur
                transition-shadow
                ${scrolled ? 'shadow-md' : 'shadow-none'}
              `}
            >
              <button
                onClick={onClose}
                className="cursor-pointer absolute right-5 top-4 text-xl leading-none"
                aria-label="Close"
              >
                ✕
              </button>
              {title && <h2 className="text-2xl font-bold px-6 pt-5 pb-3 pr-12">{title}</h2>}
            </div>
          )}

          {/* Contenido */}
          <div className={`p-6 pt-4 ${title ? 'mt-0' : 'mt-10'}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
