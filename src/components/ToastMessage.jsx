import { useEffect, useState, useRef } from "react";
import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";

export default function ToastMessage({ open, message, severity = "info", duration = 4000, onClose }) {
  const [visible, setVisible] = useState(open);
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setProgress(100);

      const start = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - start;
        const percent = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(percent);
      }, 30);

      const timeout = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);

      return () => {
        clearInterval(intervalRef.current);
        clearTimeout(timeout);
      };
    }
  }, [open, duration, onClose]);

  if (!visible) return null;

  const variants = {
    success: {
      icon: <CheckCircle className="text-green-600 w-5 h-5" />,
      bg: "bg-green-50 border-green-300 text-green-800",
      bar: "bg-green-500",
    },
    error: {
      icon: <XCircle className="text-red-600 w-5 h-5" />,
      bg: "bg-red-50 border-red-300 text-red-800",
      bar: "bg-red-500",
    },
    warning: {
      icon: <AlertTriangle className="text-yellow-600 w-5 h-5" />,
      bg: "bg-yellow-50 border-yellow-300 text-yellow-800",
      bar: "bg-yellow-500",
    },
    info: {
      icon: <Info className="text-blue-600 w-5 h-5" />,
      bg: "bg-blue-50 border-blue-300 text-blue-800",
      bar: "bg-blue-500",
    },
  };

  const { icon, bg, bar } = variants[severity] || variants.info;

  return (
    <div className="fixed top-5 right-5 z-50 w-full max-w-sm animate-fade-in-up">
      <div className={`relative p-4 pr-10 rounded-lg shadow-lg border-l-4 ${bg}`}>
        {/* Ícono e mensaje */}
        <div className="flex items-start gap-3">
          <div>{icon}</div>
          <div className="text-sm font-medium leading-snug">{message}</div>
        </div>

        {/* Cerrar */}
        <button
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
          className="absolute top-2 right-2 text-xl font-bold text-black/30 hover:text-black/60 transition"
          aria-label="Cerrar"
        >
          ×
        </button>

        {/* Barra de progreso */}
        <div className="absolute bottom-0 left-0 h-[3px] w-full bg-white/40 rounded-b">
          <div
            className={`h-full transition-all ${bar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
