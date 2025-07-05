import { ReactNode, MouseEvent } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={handleBackdropClick}>
      <div className="relative bg-white rounded-lg shadow-2xl p-6 max-w-md w-full pointer-events-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-black cursor-pointer transition duration-200 ease-in-out"
        >
          ✕
        </button>
        {title && <h2 className="text-2xl font-bold mb-4 text-left">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
