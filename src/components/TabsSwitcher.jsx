import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function TabsSwitcher({ activeTab, setActiveTab }) {
  return (
    <div className="inline-flex p-1 bg-gray-100 rounded-xl shadow-inner mb-8">
      <button
        onClick={() => setActiveTab("gastos")}
        className={`px-5 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
          activeTab === "gastos"
            ? "text-white shadow"
            : "text-gray-600 hover:text-[var(--color-danger)]"
        }`}
        style={{
          backgroundColor: activeTab === "gastos" ? "var(--color-danger)" : "transparent",
        }}
      >
        <ArrowDownCircle
          size={18}
          style={{
            color: activeTab === "gastos" ? "white" : "var(--color-danger)",
          }}
        />
        Gastos
      </button>
      <button
        onClick={() => setActiveTab("ingresos")}
        className={`px-5 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
          activeTab === "ingresos"
            ? "text-white shadow"
            : "text-gray-600 hover:text-[var(--color-success)]"
        }`}
        style={{
          backgroundColor: activeTab === "ingresos" ? "var(--color-success)" : "transparent",
        }}
      >
        <ArrowUpCircle
          size={18}
          style={{
            color: activeTab === "ingresos" ? "white" : "var(--color-success)",
          }}
        />
        Ingresos
      </button>
    </div>
  );
}
