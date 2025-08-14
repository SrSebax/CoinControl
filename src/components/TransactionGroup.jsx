import React from "react";
import { Edit, Trash2 } from "lucide-react";

export default function TransactionGroup({ 
  group, 
  isExpense, 
  formatDateHeader, 
  formatCurrency, 
  onEdit, 
  onDelete 
}) {
  return (
    <div className="space-y-3">
      {/* Encabezado de fecha */}
      <div className="relative flex items-center gap-2 mb-2">
        <div className="h-px flex-grow bg-gray-200"></div>
        <h3 className="text-sm font-medium text-gray-500 px-2 whitespace-nowrap">
          {formatDateHeader(group.date)}
        </h3>
        <div className="h-px flex-grow bg-gray-200"></div>
      </div>

      {/* Transacciones del día */}
      {group.items.map((transaction) => (
        <div
          key={transaction.id}
          className={`p-4 rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 ${
            isExpense
              ? "bg-red-50/50 border-red-100 hover:bg-red-50"
              : "bg-green-50/50 border-green-100 hover:bg-green-50"
          }`}
        >
          {/* Fila superior: nombre y monto */}
          <div className="flex justify-between items-center mb-2">
            {/* Nombre de la transacción */}
            <h4 className="font-medium text-gray-800 text-lg mr-2">
              {transaction.name || "Sin nombre"}
            </h4>
            
            {/* Monto */}
            <div className={`flex items-center gap-1 ${
              isExpense ? "text-red-600" : "text-green-600"
            }`}>
              <span className="text-sm font-medium">
                {isExpense ? "-" : "+"}
              </span>
              <span className="font-bold text-lg">
                {formatCurrency(transaction.amount)}
              </span>
            </div>
          </div>
          
          {/* Categoría y nota */}
          <div className="mt-1 mb-3">
            <span className="text-sm text-gray-500">
              {transaction.category || "Sin categoría"}
            </span>
            {transaction.note && (
              <p className="text-xs text-gray-400 mt-1 italic">
                {transaction.note}
              </p>
            )}
          </div>
          
          {/* Acciones */}
          <div className="flex justify-end items-center">
            {/* Botón Editar */}
            <div className="relative group">
              <button
                onClick={() => onEdit(transaction)}
                className="cursor-pointer p-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:bg-teal-50 rounded-full transition-colors shadow-sm hover:shadow"
              >
                <Edit size={18} />
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                Editar transacción
              </span>
            </div>

            {/* Botón Eliminar */}
            <div className="relative group ml-1">
              <button
                onClick={() => onDelete(transaction)}
                className="cursor-pointer p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors shadow-sm hover:shadow"
              >
                <Trash2 size={18} />
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                Eliminar transacción
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
