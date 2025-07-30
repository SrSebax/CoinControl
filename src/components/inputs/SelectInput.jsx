import { ChevronDown } from "lucide-react";

export default function SelectInput({ options, value, onChange, onBlur, error }) {
  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
        Categoría *
      </label>
      <select
        name="category"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition appearance-none pr-10 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      >
        <option value="">Selecciona una categoría</option>
        {options.map((cat) => (
          <option key={cat} value={cat.toLowerCase()}>
            {cat}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        className="absolute right-3 top-10 text-gray-500 pointer-events-none"
      />
    </div>
  );
}