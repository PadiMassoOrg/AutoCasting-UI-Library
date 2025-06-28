import { clsx } from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'disabled';
};

const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    danger: 'button-danger',
    disabled: 'button-disabled',
  };

  return <button className={clsx('button-default', variantClasses[variant], className)} {...props} />;
};

export default Button;
