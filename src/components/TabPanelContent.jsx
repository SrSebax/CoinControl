// src/components/TabPanelContent.jsx
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TabPanelContent({ activeTab }) {
  const navigate = useNavigate();

  const isExpense = activeTab === "gastos";
  const title = isExpense ? "Tus Gastos" : "Tus Ingresos";
  const description = isExpense
    ? "Aquí se mostrarán los gastos del periodo seleccionado."
    : "Aquí se mostrarán los ingresos del periodo seleccionado.";

  const redirectToForm = () => {
    navigate("/new-entry", {
      state: { type: isExpense ? "expense" : "income" },
    });
  };

  return (
    <div className="mt-12 bg-white rounded-xl shadow p-6 border border-gray-100 transition-all duration-300 relative">
      {/* Encabezado con botón */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button
  onClick={redirectToForm}
  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--color-primary)] bg-white border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm hover:shadow-md"
>
  <PlusCircle size={18} className="transition-transform group-hover:rotate-90" />
  <span>Agregar</span>
</button>

      </div>

      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
