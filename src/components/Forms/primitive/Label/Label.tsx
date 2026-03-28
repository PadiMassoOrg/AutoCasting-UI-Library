import { clsx } from 'clsx';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  variant?: 'default' | 'error' | 'warning';
};

const Label = ({ className, variant = 'default', ...props }: LabelProps) => {
  const variantClasses = {
    default: 'input-label-default',
    warning: 'input-label-warning',
    error: 'text-(--color-alert-error)',
  };

  return <label className={clsx('text-sm', variantClasses[variant], className)} {...props} />;
};

export default Label;
