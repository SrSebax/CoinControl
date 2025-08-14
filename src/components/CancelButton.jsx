import { X } from "lucide-react";

export default function CancelButton({
  Icon = X,
  label = "Cancelar",
  color = "bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200",
  text = "text-gray-700",
  sizeClass = "w-full",
  disabled = false,
  onClick,
}) {
  return (
    <div className="pt-2">
      <button
        disabled={disabled}
        type="button"
        onClick={onClick}
        className={`${color} ${sizeClass} py-3 px-5 ${text} cursor-pointer font-semibold text-sm rounded-2xl shadow-sm hover:shadow transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {Icon && <Icon size={20} />}
        {label}
      </button>
    </div>
  );
}
