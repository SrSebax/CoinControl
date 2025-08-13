import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ModalPortal({ children, isOpen }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-fullscreen">
      {children}
    </div>,
    document.body
  );
}