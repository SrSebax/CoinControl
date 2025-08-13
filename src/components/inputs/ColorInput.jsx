import { useState } from "react";

const colors = [
  { name: "Rojo", hex: "#FF6B6B" },
  { name: "Naranja", hex: "#FF9E7D" },
  { name: "Amarillo", hex: "#FFCE56" },
  { name: "Turquesa", hex: "#4BC0C0" },
  { name: "Azul", hex: "#36A2EB" },
  { name: "Morado", hex: "#9966FF" },
  { name: "Rosa", hex: "#FF6384" },
  { name: "Gris", hex: "#C9CBCF" },
  { name: "Verde menta", hex: "#7DCFB6" },
  { name: "Verde azulado", hex: "#00B8A9" },
  { name: "Coral", hex: "#F79D84" },
  { name: "Marrón", hex: "#695958" },
];

export default function ColorInput({ value, onChange, label = "Color", name = "color", error = false }) {
  const handleColorSelect = (colorHex) => {
    onChange({ target: { name, value: colorHex } });
  };

  const selectedColor = colors.find(color => color.hex === value);

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {value && (
        <div className="mb-3 p-2 bg-gray-50 border border-gray-200 rounded-md flex items-center">
          <div 
            className="w-6 h-6 rounded-full shadow-sm mr-2" 
            style={{ backgroundColor: value }}
          ></div>
          <div className="text-sm font-medium">
            {selectedColor ? selectedColor.name : ""} ({value})
          </div>
        </div>
      )}
      
      <div className="w-full p-3 border border-gray-300 rounded-md bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2 pb-2 pl-2 pt-2">
          {colors.map((color) => (
            <button
              key={color.hex}
              type="button"
              onClick={() => handleColorSelect(color.hex)}
              className={`p-3 rounded-md hover:bg-gray-50 transition-all duration-200 flex items-center ${
                color.hex === value ? "bg-[var(--color-primary-light)] ring-2 ring-[var(--color-primary)]" : "border border-gray-200"
              }`}
            >
              <div 
                className="w-8 h-8 rounded-full mr-4 flex-shrink-0" 
                style={{ backgroundColor: color.hex }}
              ></div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{color.name}</span>
                <span className="text-xs text-gray-500">{color.hex}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">Por favor selecciona un color</p>
      )}
    </div>
  );
}