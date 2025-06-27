import { clsx } from 'clsx';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  variant?: 'default' | 'error' | 'warning';
};

const Label = ({ className, variant = 'default', ...props }: LabelProps) => {
  const variantClasses = {
    default: 'input-label-default',
    error: 'input-label-error',
    warning: 'input-label-warning',
  };

  return <label className={clsx('input-label', variantClasses[variant], className)} {...props} />;
};

export default Label;
