export default function SubmitButton({
  Icon,
  label,
  color = "bg-[var(--color-primary)] hover:brightness-110",
  text,
  sizeClass = "w-full",
  disabled,
}) {
  return (
    <div className="pt-2">
      <button
        disabled={disabled}
        type="submit"
        className={`${color} ${sizeClass} py-3 px-5 ${text} font-semibold text-sm rounded-2xl shadow hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {Icon && <Icon size={20} />}
        {label}
      </button>
    </div>
  );
}
