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
};

export default function Toast({
  title,
  description,
  type = 'default',
  className,
  titleClassName,
  descriptionClassName,
  iconClassName,
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
        'flex flex-row items-center w-full gap-3 rounded-lg p-3 shadow-md max-w-[330px]',
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

      <div data-toast-part="content" className="flex-1">
        <p data-toast-part="title" className={clsx('text-sm font-semibold', titleClassName)}>
          {title}
        </p>
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
