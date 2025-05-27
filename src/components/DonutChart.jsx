// src/components/DonutChart.jsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#10B981", "#EF4444"]; // verde - ingresos, rojo - gastos

export default function DonutChart({ ingresos, gastos }) {
  const data = [
    { name: "Ingresos", value: ingresos },
    { name: "Gastos", value: gastos },
  ];

  return (
    <div className="mt-10">
      <h4 className="text-xl font-bold mb-4 text-gray-800">Distribución</h4>
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="flex justify-center mt-4 gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="block w-3 h-3 rounded-full bg-[#10B981]" />
            Ingresos
          </div>
          <div className="flex items-center gap-2">
            <span className="block w-3 h-3 rounded-full bg-[#EF4444]" />
            Gastos
          </div>
        </div>
      </div>
    </div>
  );
}
