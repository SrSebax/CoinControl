import React from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Equal,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function TableSummary({ ingresos = 0, gastos = 0 }) {
  const saldo = ingresos - gastos;

  const formatCurrency = (value) =>
    `$${value.toLocaleString("es-CO", { minimumFractionDigits: 2 })}`;

  const summaryItems = [
    {
      title: "Ingresos",
      icon: <ArrowUpCircle className="text-green-600" size={26} />,
      value: ingresos,
      bg: "bg-green-50/80",
      border: "border-green-200",
      textColor: "text-green-700",
    },
    {
      title: "Gastos",
      icon: <ArrowDownCircle className="text-red-600" size={26} />,
      value: gastos,
      bg: "bg-red-50/80",
      border: "border-red-200",
      textColor: "text-red-700",
    },
    {
      title: "Saldo",
      icon: <Equal className="text-blue-600" size={26} />,
      value: saldo,
      bg: saldo >= 0 ? "bg-blue-50/80" : "bg-rose-50/80",
      border: saldo >= 0 ? "border-blue-200" : "border-rose-200",
      textColor: saldo >= 0 ? "text-blue-700" : "text-rose-700",
      badge:
        saldo >= 0 ? (
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <CheckCircle2 size={14} className="mr-1" /> Positivo
          </span>
        ) : (
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
            <AlertTriangle size={14} className="mr-1" /> Negativo
          </span>
        ),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryItems.map(
          ({ title, icon, value, bg, border, textColor, badge }, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden flex flex-col justify-between gap-3 p-6 rounded-2xl shadow-md border ${bg} ${border} backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-600">{title}</div>
                {icon}
              </div>

              <div className={`text-2xl font-extrabold ${textColor}`}>
                {formatCurrency(value)}
              </div>

              {title === "Saldo" && badge && (
                <div className="absolute top-4 right-4">{badge}</div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
