import clsx from 'clsx';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';
import type { ShowToastOptions, ToastContextValue, ToastPosition, ToastRecord } from './toast.types';

type ToastProviderProps = {
  children: ReactNode;
  defaultDurationMs?: number;
  maxToasts?: number;
  viewportClassName?: string;
  toastClassName?: string;
};

const TOAST_POSITIONS: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

const VIEWPORT_POSITION_CLASSES: Record<ToastPosition, string> = {
  'top-left': 'left-4 top-4 items-start sm:left-6 sm:top-6',
  'top-center': 'left-1/2 top-4 -translate-x-1/2 items-center sm:top-6',
  'top-right': 'right-4 top-4 items-end sm:right-6 sm:top-6',
  'bottom-left': 'bottom-4 left-4 flex-col-reverse items-start sm:bottom-6 sm:left-6',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 flex-col-reverse items-center sm:bottom-6',
  'bottom-right': 'bottom-4 right-4 flex-col-reverse items-end sm:bottom-6 sm:right-6',
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let activeToastApi: ToastContextValue | null = null;
let toastSequence = 0;
const queuedToasts: ShowToastOptions[] = [];

function nextToastId() {
  toastSequence += 1;
  return `toast-${Date.now()}-${toastSequence}`;
}

function registerToastApi(api: ToastContextValue) {
  activeToastApi = api;

  if (queuedToasts.length > 0) {
    const pending = queuedToasts.splice(0, queuedToasts.length);
    pending.forEach((toast) => {
      api.showToast(toast);
    });
  }

  return () => {
    if (activeToastApi === api) {
      activeToastApi = null;
    }
  };
}

function ToastViewportItem({
  toast,
  position,
  toastClassName,
  onDismiss,
}: {
  toast: ToastRecord;
  position: ToastPosition;
  toastClassName?: string;
  onDismiss: (id: string) => void;
}) {
  useEffect(() => {
    if (!Number.isFinite(toast.durationMs) || toast.durationMs <= 0) return;

    const timeoutId = window.setTimeout(() => {
      onDismiss(toast.id);
    }, toast.durationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [onDismiss, toast.durationMs, toast.id]);

  return (
    <div
      className={clsx('pointer-events-none flex w-full', {
        'justify-start': position === 'top-left' || position === 'bottom-left',
        'justify-center': position === 'top-center' || position === 'bottom-center',
        'justify-end': position === 'top-right' || position === 'bottom-right',
      })}
    >
      <div className="pointer-events-auto">
        <Toast
          title={toast.title}
          description={toast.description}
          type={toast.type}
          className={clsx(toastClassName, toast.className)}
          fullWidth={toast.fullWidth}
          closable={toast.closable}
          onClose={() => onDismiss(toast.id)}
        />
      </div>
    </div>
  );
}

export function showToast(options: ShowToastOptions) {
  const toastId = options.id ?? nextToastId();

  if (!activeToastApi) {
    queuedToasts.push({ ...options, id: toastId });
    return toastId;
  }

  return activeToastApi.showToast({ ...options, id: toastId });
}

export function dismissToast(id: string) {
  activeToastApi?.dismissToast(id);
}

export function clearToasts() {
  activeToastApi?.clearToasts();
}

export function useToast() {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return ctx;
}

export function ToastProvider({
  children,
  defaultDurationMs = 2500,
  maxToasts = 5,
  viewportClassName,
  toastClassName,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const dismissToastInternal = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  const clearToastsInternal = useCallback(() => {
    setToasts([]);
  }, []);

  const showToastInternal = useCallback(
    ({
      id,
      type = 'default',
      position = 'top-center',
      durationMs = defaultDurationMs,
      fullWidth = false,
      closable = false,
      ...toastOptions
    }: ShowToastOptions) => {
      const toastId = id ?? nextToastId();
      const nextToast: ToastRecord = {
        id: toastId,
        type,
        position,
        durationMs,
        fullWidth,
        closable,
        ...toastOptions,
      };

      setToasts((currentToasts) => {
        const withoutCurrentToast = currentToasts.filter((toast) => toast.id !== toastId);
        const samePositionToasts = withoutCurrentToast.filter((toast) => toast.position === position);
        const otherPositionToasts = withoutCurrentToast.filter((toast) => toast.position !== position);
        const nextPositionToasts = [nextToast, ...samePositionToasts].slice(0, maxToasts);

        return [...nextPositionToasts, ...otherPositionToasts];
      });

      return toastId;
    },
    [defaultDurationMs, maxToasts]
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      showToast: showToastInternal,
      dismissToast: dismissToastInternal,
      clearToasts: clearToastsInternal,
    }),
    [clearToastsInternal, dismissToastInternal, showToastInternal]
  );

  useEffect(() => registerToastApi(value), [value]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== 'undefined'
        ? createPortal(
            <>
              {TOAST_POSITIONS.map((position) => {
                const positionedToasts = toasts.filter((toast) => toast.position === position);

                if (positionedToasts.length === 0) return null;

                return (
                  <div
                    key={position}
                    aria-live="polite"
                    aria-atomic="false"
                    data-toast-position={position}
                    data-toast-part="viewport"
                    className={clsx(
                      'pointer-events-none fixed z-[1100] flex w-[calc(100%-2rem)] max-w-[1400px] flex-col gap-3',
                      VIEWPORT_POSITION_CLASSES[position],
                      viewportClassName
                    )}
                  >
                    {positionedToasts.map((toast) => (
                      <ToastViewportItem
                        key={toast.id}
                        toast={toast}
                        position={position}
                        toastClassName={toastClassName}
                        onDismiss={dismissToastInternal}
                      />
                    ))}
                  </div>
                );
              })}
            </>,
            document.body
          )
        : null}
    </ToastContext.Provider>
  );
}
