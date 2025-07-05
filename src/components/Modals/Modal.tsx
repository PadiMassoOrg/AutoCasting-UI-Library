import { ReactNode, MouseEvent } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={handleBackdropClick}>
      <div className="relative bg-white rounded-lg shadow-2xl p-6 pt-12 max-w-md w-full pointer-events-auto">
        <button onClick={onClose} className="absolute top-2 right-4 text-gray-500 hover:text-black cursor-pointer">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
