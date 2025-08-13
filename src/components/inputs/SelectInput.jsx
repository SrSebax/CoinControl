import { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus } from "lucide-react";
import * as LucideIcons from "lucide-react";

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
  addNewLabel = "Agregar nuevo",
  isObjectOptions = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
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
      setSelectedOption(null);
      return;
    }
    
    if (isObjectOptions) {
      const selected = options.find(opt => opt.id === value);
      if (selected) {
        setSelectedLabel(selected.name);
        setSelectedOption(selected);
      } else {
        setSelectedLabel("");
        setSelectedOption(null);
      }
    } else {
      const selected = options.find(opt => 
        typeof opt === 'string' ? opt.toLowerCase() === value : false
      );
      if (selected) {
        setSelectedLabel(selected);
        setSelectedOption(selected);
      } else {
        setSelectedLabel("");
        setSelectedOption(null);
      }
    }
  }, [value, options, isObjectOptions]);
  
  const handleSelect = (option) => {
    if (isObjectOptions) {
      onChange({ target: { name, value: option.id } });
      setSelectedLabel(option.name);
      setSelectedOption(option);
    } else {
      onChange({ target: { name, value: option.toLowerCase() } });
      setSelectedLabel(option);
      setSelectedOption(option);
    }
    
    setIsOpen(false);
    
    if (onBlur) {
      onBlur({ 
        target: { 
          name, 
          value: isObjectOptions ? option.id : option.toLowerCase() 
        } 
      });
    }
  };
  
  const handleAddNew = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    if (onAddNew && typeof onAddNew === 'function') {
      onAddNew();
    }
  };

  // Renderizar el icono si existe
  const renderIcon = (option) => {
    if (!isObjectOptions || !option.icon) return null;
    
    const IconComponent = LucideIcons[option.icon];
    if (!IconComponent) return null;
    
    return (
      <div className="mr-2" style={{ color: option.color || 'currentColor' }}>
        <IconComponent size={18} />
      </div>
    );
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
        <div className="flex items-center">
          {selectedOption && isObjectOptions && renderIcon(selectedOption)}
          <span className={selectedLabel ? "text-gray-800" : "text-gray-400"}>
            {selectedLabel || placeholder}
          </span>
        </div>
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
              {options.map((option) => {
                const optionValue = isObjectOptions ? option.id : option.toLowerCase();
                const optionLabel = isObjectOptions ? option.name : option;
                const isSelected = value === optionValue;
                
                return (
                  <div
                    key={optionValue}
                    onClick={() => handleSelect(option)}
                    className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-100 transition-colors flex items-center ${
                      isSelected ? "bg-gray-50 text-[var(--color-primary)] font-medium" : "text-gray-700"
                    }`}
                  >
                    {isObjectOptions && renderIcon(option)}
                    {optionLabel}
                  </div>
                );
              })}
              
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
        {options.map((opt) => {
          const optionValue = isObjectOptions ? opt.id : (typeof opt === 'string' ? opt.toLowerCase() : opt);
          const optionLabel = isObjectOptions ? opt.name : opt;
          
          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
}