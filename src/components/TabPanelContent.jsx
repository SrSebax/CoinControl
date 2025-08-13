// src/components/TabPanelContent.jsx
import { useState } from "react";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../hooks/useLocalStorage";
import ConfirmModal from "./ConfirmModal";

export default function TabPanelContent({ activeTab }) {
  const navigate = useNavigate();
  const { getTransactionsByPeriod, deleteTransaction } = useTransactions();
  
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    transactionId: null,
    title: "",
    message: ""
  });

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
  
  const handleEditTransaction = (transaction) => {
    navigate(`/edit-entry/${transaction.id}`);
  };
  
  const handleDeleteClick = (transaction) => {
    setConfirmModal({
      open: true,
      transactionId: transaction.id,
      title: "¿Eliminar movimiento?",
      message: `¿Estás seguro de que deseas eliminar "${transaction.name || 'Sin nombre'}" por ${formatCurrency(transaction.amount)}? Esta acción no se puede deshacer.`
    });
  };
  
  const handleConfirmDelete = () => {
    if (confirmModal.transactionId) {
      deleteTransaction(confirmModal.transactionId);
      setConfirmModal({ open: false, transactionId: null, title: "", message: "" });
    }
  };
  
  const handleCancelDelete = () => {
    setConfirmModal({ open: false, transactionId: null, title: "", message: "" });
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
              className={`flex items-center justify-between p-4 rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 ${
                isExpense 
                  ? 'bg-red-50/50 border-red-100 hover:bg-red-50' 
                  : 'bg-green-50/50 border-green-100 hover:bg-green-50'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-800 text-lg">{transaction.name || 'Sin nombre'}</h4>
                  <span className={`font-bold text-lg ${
                    isExpense ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {isExpense ? '-' : '+'}{formatCurrency(transaction.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <span className="text-sm text-gray-500">
                      {transaction.category || 'Sin categoría'}
                    </span>
                    {transaction.note && (
                      <p className="text-xs text-gray-400 mt-1 italic">
                        {transaction.note}
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </span>
                </div>
              </div>
              <div className="flex ml-3">
                <button
                  onClick={() => handleEditTransaction(transaction)}
                  className="p-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:bg-teal-50 rounded-full transition-colors shadow-sm hover:shadow"
                  title="Editar transacción"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteClick(transaction)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors shadow-sm hover:shadow ml-1"
                  title="Eliminar transacción"
                >
                  <Trash2 size={18} />
                </button>
              </div>
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
      
      {/* Modal de confirmación */}
      <ConfirmModal
        open={confirmModal.open}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
