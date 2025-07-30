import React from "react";

export default function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 animate-fade-in">
        {/* Título */}
        <h2 className="text-xl font-extrabold text-teal-600 mb-1">{title}</h2>

        {/* Mensaje */}
        <p className="text-sm text-gray-600 mb-4">{message}</p>

        {/* Botones */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition cursor-pointer"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
