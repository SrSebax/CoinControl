// src/components/TabPanelContent.jsx
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../hooks/useLocalStorage";
import ConfirmModal from "./ConfirmModal";
import TransactionGroup from "./TransactionGroup";

export default function TabPanelContent({ activeTab }) {
  const navigate = useNavigate();
  const { deleteTransaction } = useTransactions();

  const [confirmModal, setConfirmModal] = useState({
    open: false,
    transactionId: null,
    title: "",
    message: "",
  });

  const isExpense = activeTab === "gastos";
  const title = isExpense ? "Tus Gastos" : "Tus Ingresos";
  const description = isExpense
    ? "Aquí se mostrarán los gastos recientes."
    : "Aquí se mostrarán los ingresos recientes.";
    
  // Obtener todas las transacciones del tipo actual
  const { transactions } = useTransactions();
  const currentTransactions = transactions.filter(
    (t) => isExpense ? t.type === "expense" : t.type === "income"
  );
  
  // Agrupar transacciones por fecha
  const groupedTransactions = currentTransactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date);
    const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    if (!groups[dateKey]) {
      groups[dateKey] = {
        date: transaction.date,
        items: [],
      };
    }

    groups[dateKey].items.push(transaction);
    return groups;
  }, {});

  // Convertir el objeto agrupado a un array ordenado por fecha (más reciente primero)
  const transactionsByDate = Object.values(groupedTransactions).sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

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
      message: `¿Estás seguro de que deseas eliminar "${
        transaction.name || "Sin nombre"
      }" por ${formatCurrency(
        transaction.amount
      )}? Esta acción no se puede deshacer.`,
    });
  };

  const handleConfirmDelete = () => {
    if (confirmModal.transactionId) {
      deleteTransaction(confirmModal.transactionId);
      setConfirmModal({
        open: false,
        transactionId: null,
        title: "",
        message: "",
      });
    }
  };

  const handleCancelDelete = () => {
    setConfirmModal({
      open: false,
      transactionId: null,
      title: "",
      message: "",
    });
  };

  const formatCurrency = (value) =>
    `$${value.toLocaleString("es-CO", { minimumFractionDigits: 2 })}`;

  // Formatear fecha para encabezados de grupo
  const formatDateHeader = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hoy";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Ayer";
    } else {
      return date.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year:
          date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  return (
    <div className="mt-12 bg-white rounded-xl shadow p-6 border border-gray-100 transition-all duration-300 relative">
      {/* Encabezado con botón */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button
          onClick={redirectToForm}
          className="cursor-pointer inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--color-primary)] bg-white border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm hover:shadow-md"
        >
          <PlusCircle
            size={18}
            className="transition-transform group-hover:rotate-90"
          />
          <span>Agregar</span>
        </button>
      </div>

      <p className="text-sm text-gray-600">{description}</p>

      {/* Lista de transacciones agrupadas por fecha */}
      {currentTransactions.length > 0 ? (
        <div className="mt-6 space-y-6">
          {transactionsByDate.map((group, index) => (
            <TransactionGroup
              key={index}
              group={group}
              isExpense={isExpense}
              formatDateHeader={formatDateHeader}
              formatCurrency={formatCurrency}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 text-center py-8">
          <p className="text-gray-500 text-sm">
            No hay {isExpense ? "gastos" : "ingresos"} registrados en este
            periodo.
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Haz clic en "Agregar" para registrar tu primer{" "}
            {isExpense ? "gasto" : "ingreso"}.
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
