export default function DateInput({ value, onChange, onBlur, error }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
        Fecha *
      </label>
      <input
        type="date"
        name="date"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
    </div>
  );
}
