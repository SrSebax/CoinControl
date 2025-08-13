import { ChevronDown } from "lucide-react";

export default function SelectInput({ 
  options, 
  value, 
  onChange, 
  onBlur, 
  error,
  name = "select",
  label = "",
  required = false,
  placeholder = "Selecciona una opción",
  valueKey = "value",
  labelKey = "label",
  className = "",
  iconSize = 18,
  iconClassName = "absolute right-3 top-10 text-gray-500 pointer-events-none",
  showIcon = true
}) {
  // Determinar si las opciones son objetos o strings
  const isObjectOptions = options.length > 0 && typeof options[0] === 'object';

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
          {label} {required && "*"}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition appearance-none pr-10 ${
          error ? "border-red-400" : "border-gray-300"
        } ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => {
          if (isObjectOptions) {
            const optionValue = option[valueKey];
            const optionLabel = option[labelKey];
            return (
              <option key={optionValue || index} value={optionValue}>
                {optionLabel}
              </option>
            );
          } else {
            return (
              <option key={option || index} value={typeof option === 'string' ? option.toLowerCase() : option}>
                {option}
              </option>
            );
          }
        })}
      </select>
      {showIcon && (
        <ChevronDown
          size={iconSize}
          className={iconClassName}
        />
      )}
    </div>
  );
}