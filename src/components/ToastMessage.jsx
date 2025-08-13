import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function ToastMessage({ open = false, message, type = 'success', onClose, duration = 5000 }) {
  useEffect(() => {
    if (!open) return;
    
    // Auto-cerrar después del tiempo especificado
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'error':
        return <XCircle size={20} className="text-red-600" />;
      default:
        return <CheckCircle size={20} className="text-blue-600" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  if (!open) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-2">
      <div className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg ${getStyles()}`}>
        {getIcon()}
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 p-1 hover:bg-black/10 rounded-full transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
