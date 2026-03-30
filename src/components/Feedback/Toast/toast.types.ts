import type { ReactNode } from 'react';

export type ToastType = 'default' | 'success' | 'warning' | 'danger';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type ToastContent = {
  title: ReactNode;
  description?: ReactNode;
};

export type ShowToastOptions = ToastContent & {
  id?: string;
  type?: ToastType;
  position?: ToastPosition;
  durationMs?: number;
  className?: string;
};

export type ToastRecord = ToastContent & {
  id: string;
  type: ToastType;
  position: ToastPosition;
  durationMs: number;
  className?: string;
};

export type ToastContextValue = {
  showToast: (options: ShowToastOptions) => string;
  dismissToast: (id: string) => void;
  clearToasts: () => void;
};
