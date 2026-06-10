import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName, type IconVariant } from '../../Brand/Identity/Icon';
import type { ToastType } from './toast.types';

const TYPE_STYLES: Record<
  ToastType,
  {
    container: string;
  }
> = {
  default: {
    container: 'bg-(--color-toast-default-bg) text-(--color-primary-black)',
  },
  success: {
    container: 'bg-(--color-toast-success-bg) text-(--color-primary-black)',
  },
  warning: {
    container: 'bg-(--color-toast-warning-bg) text-(--color-primary-black)',
  },
  danger: {
    container: 'bg-(--color-toast-danger-bg) text-(--color-primary-black)',
  },
};

const TOAST_ICON_BY_TYPE: Record<ToastType, { name: IconName; variant?: IconVariant }> = {
  default: { name: 'info', variant: 'primary' },
  success: { name: 'tick', variant: 'success' },
  warning: { name: 'warning', variant: 'default' },
  danger: { name: 'info', variant: 'danger' },
};

export type ToastProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  title: ReactNode;
  description?: ReactNode;
  type?: ToastType;
  titleClassName?: string;
  descriptionClassName?: string;
  iconClassName?: string;
  fullWidth?: boolean;
  closable?: boolean;
  onClose?: () => void;
};

export default function Toast({
  title,
  description,
  type = 'default',
  className,
  titleClassName,
  descriptionClassName,
  iconClassName,
  fullWidth = false,
  closable = false,
  onClose,
  role,
  ...rest
}: ToastProps) {
  const styles = TYPE_STYLES[type];
  const icon = TOAST_ICON_BY_TYPE[type];

  return (
    <article
      data-toast-type={type}
      data-toast-part="root"
      role={role ?? (type === 'danger' ? 'alert' : 'status')}
      className={clsx(
        'flex w-full flex-row items-center gap-3 rounded-lg p-3 shadow-md',
        fullWidth ? 'max-w-[650px]' : 'max-w-[330px]',
        styles.container,
        className
      )}
      {...rest}
    >
      <Icon
        name={icon.name}
        variant={icon.variant}
        aria-hidden="true"
        className={clsx('cursor-default', iconClassName)}
      />

      <div data-toast-part="content" className={`flex min-w-0 flex-1 flex-col gap-1`}>
        <div className="flex items-center justify-between">
          <p data-toast-part="title" className={clsx('text-sm font-semibold', titleClassName)}>
            {title}
          </p>
          {closable ? (
            <button type="button" aria-label="Close toast" className="cursor-pointer" onClick={onClose}>
              <Icon name="cross" variant="default" aria-hidden="true" size={10} />
            </button>
          ) : null}
        </div>
        {description ? (
          <p
            data-toast-part="description"
            className={clsx('text-sm font-light text-(--color-secondary-gray)', descriptionClassName)}
          >
            {description}
          </p>
        ) : null}
      </div>
    </article>
  );
}
