import { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus } from "lucide-react";

export default function SelectInput({ 
  options, 
  value, 
  onChange, 
  onBlur, 
  error, 
  label = "Seleccionar", 
  name = "select", 
  placeholder = "Selecciona una opción",
  onAddNew = null,
  addNewLabel = "Agregar nuevo"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const dropdownRef = useRef(null);
  
  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // Actualizar la etiqueta seleccionada cuando cambia el valor o las opciones
  useEffect(() => {
    if (!value) {
      setSelectedLabel("");
      return;
    }
    
    const selectedOption = options.find(opt => opt.toLowerCase() === value);
    if (selectedOption) {
      setSelectedLabel(selectedOption);
    } else {
      // Si el valor actual no está en las opciones disponibles, limpiamos la selección
      setSelectedLabel("");
      // Opcionalmente, podríamos también limpiar el valor si no está en las opciones:
      // if (onChange) {
      //   onChange({ target: { name, value: "" } });
      // }
    }
  }, [value, options, name]);
  
  const handleSelect = (option) => {
    onChange({ target: { name, value: option.toLowerCase() } });
    setSelectedLabel(option);
    setIsOpen(false);
    if (onBlur) {
      onBlur({ target: { name, value: option.toLowerCase() } });
    }
  };
  
  const handleAddNew = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    if (onAddNew && typeof onAddNew === 'function') {
      onAddNew();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
        {label} {label && "*"}
      </label>
      
      {/* Campo de selección personalizado */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm cursor-pointer flex items-center justify-between shadow-sm hover:bg-gray-50 transition ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      >
        <span className={selectedLabel ? "text-gray-800" : "text-gray-400"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </div>
      
      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-60 overflow-y-auto">
          {options.length > 0 ? (
            <>
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-100 transition-colors ${
                    value === option.toLowerCase() ? "bg-gray-50 text-[var(--color-primary)] font-medium" : "text-gray-700"
                  }`}
                >
                  {option}
                </div>
              ))}
              
              {/* Opción para agregar nueva categoría */}
              {onAddNew && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div
                    onClick={handleAddNew}
                    className="mx-3 my-1.5 px-3 py-2 rounded-lg bg-gray-50 text-sm cursor-pointer hover:bg-gray-100 transition-all text-[var(--color-primary)] flex items-center justify-center gap-2 font-medium"
                  >
                    <Plus size={16} strokeWidth={2.5} className="text-[var(--color-primary)]" />
                    <span>{addNewLabel}</span>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">No hay opciones disponibles</div>
          )}
        </div>
      )}
      
      {/* Select nativo oculto para accesibilidad */}
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="sr-only"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt.toLowerCase()}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}