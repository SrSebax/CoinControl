import { useState, useEffect } from "react";

export default function AmountInput({ value, onChange, onBlur, error }) {
  const [amountFormatted, setAmountFormatted] = useState("");

  const formatToCOP = (value) => {
    const number = parseFloat(value.replace(/[.,]/g, ""));
    if (isNaN(number)) return "";
    return number.toLocaleString("es-CO");
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    const formatted = formatToCOP(rawValue);
    setAmountFormatted(formatted);
    onChange({ target: { name: "amount", value: rawValue } });
  };

  useEffect(() => {
    if (value) setAmountFormatted(formatToCOP(value));
  }, [value]);

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
        Monto *
      </label>
      <input
        type="text"
        name="amount"
        value={amountFormatted}
        onChange={handleAmountChange}
        onBlur={onBlur}
        placeholder="Ej: 50.000"
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
    </div>
  );
}