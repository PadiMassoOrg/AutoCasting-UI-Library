import { ReactNode, MouseEvent } from 'react';

type ModalSize = 'auto' | 'sm' | 'md' | 'lg' | 'xl' | 'xl' | 'xl_2' | 'xl_3';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children, size }: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    auto: 'w-auto',
    sm: 'max-w-sm w-full',
    md: 'max-w-md w-full',
    lg: 'max-w-lg w-full',
    xl: 'max-w-xl w-full',
    xl_2: 'max-w-2xl w-full',
    xl_3: 'max-w-3xl w-full',
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={handleBackdropClick}>
      <div className={`relative bg-white rounded-2xl shadow-2xl p-6 pointer-events-auto ${sizeClasses[size || 'md']}`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-black cursor-pointer transition duration-200 ease-in-out"
        >
          ✕
        </button>
        {title && <h2 className="text-lg md:text-2xl font-bold mb-4 text-left">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
