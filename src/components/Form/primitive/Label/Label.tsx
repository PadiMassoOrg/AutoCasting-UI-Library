import { clsx } from 'clsx';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  variant?: 'default' | 'error' | 'warning';
};

const Label = ({ className, variant = 'default', ...props }: LabelProps) => {
  const variantClasses = {
    default: 'text-gray-700',
    error: 'text-red-600',
    warning: 'text-yellow-600',
  };

  return <label className={clsx('block text-sm font-medium mb-1', variantClasses[variant], className)} {...props} />;
};

export default Label;
