import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function TabsSwitcher({ activeTab, setActiveTab }) {
  const isGastos = activeTab === "gastos";
  const isIngresos = activeTab === "ingresos";

  return (
    <div className="inline-flex p-1 bg-gray-100 rounded-xl shadow-inner mb-8">
      <button
        onClick={() => setActiveTab("gastos")}
        className={`px-5 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
          isGastos
            ? "text-red-800 shadow"
            : "text-gray-600 hover:text-red-700"
        }`}
        style={{
          backgroundColor: isGastos ? "var(--color-expense)" : "transparent",
        }}
      >
        <ArrowDownCircle
          size={18}
          style={{
            color: isGastos ? "red" : "var(--color-expense-hover)",
          }}
        />
        Gastos
      </button>
      <button
        onClick={() => setActiveTab("ingresos")}
        className={`px-5 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
          isIngresos
            ? "text-green-800 shadow"
            : "text-gray-600 hover:text-green-700"
        }`}
        style={{
          backgroundColor: isIngresos ? "var(--color-income)" : "transparent",
        }}
      >
        <ArrowUpCircle
          size={18}
          style={{
            color: isIngresos ? "green" : "var(--color-income-hover)",
          }}
        />
        Ingresos
      </button>
    </div>
  );
}
