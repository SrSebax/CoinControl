// src/components/AlertMessage.jsx
export default function AlertMessage({ open, message, severity = "info", onClose }) {
  if (!open) return null;

  const styles = {
    success: "bg-green-100 border-green-400 text-green-800",
    error: "bg-red-100 border-red-400 text-red-800",
    info: "bg-blue-100 border-blue-400 text-blue-800",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-800",
  };

  return (
    <div
      className={`w-full border-l-4 p-4 rounded-md text-sm shadow-sm flex items-start justify-between gap-4 animate-fade-in ${styles[severity]}`}
    >
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-sm font-bold px-2 hover:text-black opacity-60 hover:opacity-100 transition"
        >
          ✕
        </button>
      )}
    </div>
  );
}
