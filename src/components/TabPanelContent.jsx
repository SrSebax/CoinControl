// src/components/TabPanelContent.jsx
import { PlusCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../hooks/useLocalStorage";

export default function TabPanelContent({ activeTab }) {
  const navigate = useNavigate();
  const { getTransactionsByType, getTransactionsByPeriod, deleteTransaction } = useTransactions();

  const isExpense = activeTab === "gastos";
  const title = isExpense ? "Tus Gastos" : "Tus Ingresos";
  const description = isExpense
    ? "Aquí se mostrarán los gastos del periodo seleccionado."
    : "Aquí se mostrarán los ingresos del periodo seleccionado.";

  // Obtener transacciones del mes actual por tipo
  const currentTransactions = getTransactionsByPeriod().filter(t => 
    isExpense ? t.type === 'expense' : t.type === 'income'
  );

  const redirectToForm = () => {
    navigate("/new-entry", {
      state: { type: isExpense ? "expense" : "income" },
    });
  };

  const formatCurrency = (value) =>
    `$${value.toLocaleString("es-CO", { minimumFractionDigits: 2 })}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
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
          <PlusCircle
            size={18}
            className="transition-transform group-hover:rotate-90"
          />
          <span>Agregar</span>
        </button>
      </div>

      <p className="text-sm text-gray-600">{description}</p>

      {/* Lista de transacciones */}
      {currentTransactions.length > 0 ? (
        <div className="mt-6 space-y-3">
          {currentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-800">{transaction.note || 'Sin descripción'}</h4>
                  <span className={`font-bold ${
                    isExpense ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {isExpense ? '-' : '+'}{formatCurrency(transaction.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-500">
                    {transaction.category || 'Sin categoría'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="ml-3 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                title="Eliminar transacción"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 text-center py-8">
          <p className="text-gray-500 text-sm">
            No hay {isExpense ? 'gastos' : 'ingresos'} registrados este mes.
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Haz clic en "Agregar" para registrar tu primer {isExpense ? 'gasto' : 'ingreso'}.
          </p>
        </div>
      )}
    </div>
  );
}
