import { useEffect, useState } from "react";
import { ChevronDown, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import SubmitButton from "../SubmitButton";

export default function EntryFields({ isExpense, formData, handleChange }) {
  const categorias = isExpense
    ? ["Comida", "Transporte", "Salud", "Hogar"]
    : ["Salario", "Venta", "Regalo"];

  const [amountFormatted, setAmountFormatted] = useState("");
  const [touched, setTouched] = useState({});

  const formatToCOP = (value) => {
    const number = parseFloat(value.replace(/[.,]/g, ""));
    if (isNaN(number)) return "";
    return number.toLocaleString("es-CO");
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    const formatted = formatToCOP(rawValue);
    setAmountFormatted(formatted);
    handleChange({ target: { name: "amount", value: rawValue } });
  };

  useEffect(() => {
    if (formData.amount) {
      setAmountFormatted(formatToCOP(formData.amount));
    }
  }, [formData.amount]);

  useEffect(() => {
    if (!formData.date) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const localDate = `${yyyy}-${mm}-${dd}`;
      handleChange({ target: { name: "date", value: localDate } });
    }
  }, [formData.date, handleChange]);

  const isEmpty = (field) =>
    touched[field] && (!formData[field] || formData[field].trim() === "");

  const isFormValid = formData.amount && formData.category && formData.date;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monto */}
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
            Monto *
          </label>
          <input
            type="text"
            name="amount"
            value={amountFormatted}
            onChange={handleAmountChange}
            onBlur={() => setTouched((prev) => ({ ...prev, amount: true }))}
            placeholder="Ej: 50.000"
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition ${
              isEmpty("amount") ? "border-red-400" : "border-gray-300"
            }`}
          />
        </div>

        {/* Categoría */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
            Categoría *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={() => setTouched((prev) => ({ ...prev, category: true }))}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition appearance-none pr-10 ${
              isEmpty("category") ? "border-red-400" : "border-gray-300"
            }`}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
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

        {/* Fecha */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
            Fecha *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            onBlur={() => setTouched((prev) => ({ ...prev, date: true }))}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition ${
              isEmpty("date") ? "border-red-400" : "border-gray-300"
            }`}
          />
        </div>

        {/* Nota */}
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
            Nota (opcional)
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows={3}
            placeholder="Ej: Descripción breve..."
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition resize-none min-h-[80px]"
          />
        </div>
      </div>

      {/* Botón */}
      <SubmitButton
        label={isExpense ? "Guardar gasto" : "Guardar ingreso"}
        Icon={isExpense ? ArrowDownCircle : ArrowUpCircle}
        color={
          isExpense
            ? "bg-[var(--color-expense)] hover:bg-[var(--color-expense-hover)]"
            : "bg-[var(--color-income)] hover:bg-[var(--color-income-hover)]"
        }
        text={
          isExpense
            ? "text-[var(--color-expense-text)]"
            : "text-[var(--color-income-text)]"
        }
        disabled={!isFormValid}
      />
    </div>
  );
}
