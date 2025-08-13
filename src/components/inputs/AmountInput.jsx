import { useState, useEffect } from "react";

export default function AmountInput({ 
  value, 
  onChange, 
  onBlur, 
  error,
  label = "Monto *",
  name = "amount",
  placeholder = "Ej: 50.000",
  className = "",
  locale = "es-CO",
  required = false,
  disabled = false,
  autoFocus = false,
  readOnly = false,
  currencySymbol = "",
  maxValue,
  minValue
}) {
  const [amountFormatted, setAmountFormatted] = useState("");

  const formatToCurrency = (value) => {
    const number = parseFloat(value.replace(/[.,]/g, ""));
    if (isNaN(number)) return "";
    return number.toLocaleString(locale);
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    const formatted = formatToCurrency(rawValue);
    setAmountFormatted(formatted);
    
    // Validar límites si están definidos
    const numValue = parseFloat(rawValue);
    if (!isNaN(numValue)) {
      if (maxValue && numValue > maxValue) return;
      if (minValue && numValue < minValue) return;
    }
    
    onChange({ target: { name, value: rawValue } });
  };

  useEffect(() => {
    if (value) setAmountFormatted(formatToCurrency(value));
  }, [value, locale]);

  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
        {label}
      </label>
      <div className="relative">
        {currencySymbol && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {currencySymbol}
          </span>
        )}
        <input
          type="text"
          name={name}
          value={amountFormatted}
          onChange={handleAmountChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoFocus={autoFocus}
          readOnly={readOnly}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition ${
            error ? "border-red-400" : "border-gray-300"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${
            currencySymbol ? "pl-8" : ""
          }`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}