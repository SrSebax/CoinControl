import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function TabsSwitcher({ activeTab, setActiveTab }) {
  return (
    <div className="inline-flex p-1 bg-gray-100 rounded-xl shadow-inner mb-8">
      <button
        onClick={() => setActiveTab("gastos")}
        className={`px-5 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
          activeTab === "gastos"
            ? "bg-[var(--color-primary)] text-white shadow"
            : "text-gray-600 hover:text-[var(--color-primary)]"
        }`}
      >
        <ArrowDownCircle size={18} />
        Gastos
      </button>
      <button
        onClick={() => setActiveTab("ingresos")}
        className={`px-5 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
          activeTab === "ingresos"
            ? "bg-[var(--color-primary)] text-white shadow"
            : "text-gray-600 hover:text-[var(--color-primary)]"
        }`}
      >
        <ArrowUpCircle size={18} />
        Ingresos
      </button>
    </div>
  );
}
