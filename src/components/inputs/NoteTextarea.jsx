export default function NoteTextarea({ 
  value, 
  onChange, 
  onBlur,
  error,
  label = "Nota (opcional)",
  name = "note",
  placeholder = "Ej: Descripción breve...",
  className = "col-span-2",
  rows = 3,
  maxLength,
  minLength,
  required = false,
  disabled = false,
  autoFocus = false,
  readOnly = false,
  resize = false
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
        readOnly={readOnly}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition min-h-[80px] ${
          error ? "border-red-400" : "border-gray-300"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${
          resize ? "resize" : "resize-none"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}