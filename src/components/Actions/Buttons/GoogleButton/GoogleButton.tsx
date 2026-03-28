import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { BUTTON_STRUCTURE } from '../../../../styles/style_constants';

type GoogleButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const GoogleButton = ({ className, children, ...props }: GoogleButtonProps) => {
  const hasBg = className?.includes('bg-');
  const hasText = className?.includes('text-');

  return (
    <button
      type="button"
      className={clsx(
        BUTTON_STRUCTURE,
        'flex items-center justify-center gap-4 font-light text-base drop-shadow-sm',
        !hasBg && 'bg-(--color-primary-white)',
        !hasText && 'text-(--color-primary-black)',
        className
      )}
      {...props}
    >
      <GoogleIcon />
      <span>{children}</span>
    </button>
  );
};

const GoogleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.4H272v95.3h146.9c-6.4 34-25.6 62.8-54.7 82l89.1 69.2c52.1-48 80.2-118.7 80.2-196.1z"
      fill="#4285f4"
    />
    <path
      d="M272 544.3c72.6 0 133.5-24 178-65.3l-89.1-69.2c-24.8 16.6-56.5 26.3-88.9 26.3-68.2 0-125.9-46-146.7-107.9H35.4v67.6C79.9 482.5 170.6 544.3 272 544.3z"
      fill="#34a853"
    />
    <path d="M125.3 327.9c-10-29.4-10-61.3 0-90.7V169.6H35.4c-35.4 70.8-35.4 154.2 0 225z" fill="#fbbc04" />
    <path
      d="M272 107.7c39.5-.6 77.4 13.7 106.1 39.8l79.2-79.2C409 25.6 341.3 0 272 0 170.6 0 79.9 61.8 35.4 169.6l89.9 67.6C146.1 153.7 203.8 107.7 272 107.7z"
      fill="#ea4335"
    />
  </svg>
);

export default GoogleButton;
