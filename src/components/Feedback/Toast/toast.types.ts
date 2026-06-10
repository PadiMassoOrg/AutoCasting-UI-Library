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
  fullWidth?: boolean;
  closable?: boolean;
};

export type ToastRecord = ToastContent & {
  id: string;
  type: ToastType;
  position: ToastPosition;
  durationMs: number;
  className?: string;
  fullWidth: boolean;
  closable: boolean;
};

export type ToastContextValue = {
  showToast: (options: ShowToastOptions) => string;
  dismissToast: (id: string) => void;
  clearToasts: () => void;
};
