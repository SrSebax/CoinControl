import { useState, forwardRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateInput.css";
import es from 'date-fns/locale/es';

// Registrar el idioma español
registerLocale('es', es);

export default function DateInput({ 
  value, 
  onChange, 
  onBlur, 
  error, 
  label = "Fecha",
  name = "date"
}) {
  // Convertir el valor string a objeto Date
  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };
  
  const [selectedDate, setSelectedDate] = useState(parseDate(value));
  const [isOpen, setIsOpen] = useState(false);
  
  // Actualizar el estado selectedDate cuando cambia el valor desde fuera
  useEffect(() => {
    setSelectedDate(parseDate(value));
  }, [value]);
  
  // Extraer valores RGB del color primario para efectos de transparencia
  useEffect(() => {
    // Función para convertir color CSS a valores RGB
    const getRgbFromCssVar = (varName) => {
      const color = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      
      // Si ya es un valor RGB, extraer los números
      if (color.startsWith('rgb')) {
        const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          return `${match[1]}, ${match[2]}, ${match[3]}`;
        }
      }
      
      // Si es un valor hex, convertir a RGB
      if (color.startsWith('#')) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
      }
      
      // Valor por defecto si no se puede determinar
      return '59, 130, 246'; // Azul por defecto
    };
    
    // Obtener valores RGB y establecerlos como variable CSS
    const primaryRgb = getRgbFromCssVar('--color-primary');
    document.documentElement.style.setProperty('--color-primary-rgb', primaryRgb);
  }, []);
  
  // Formatear la fecha para mostrarla de manera amigable
  const formatDisplayDate = (date) => {
    if (!date) return "";
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };
  
  // Manejar el cambio de fecha
  const handleDateChange = (date) => {
    setSelectedDate(date);
    
    // Convertir la fecha a formato YYYY-MM-DD para el formulario
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      onChange({ target: { name, value: formattedDate } });
    } else {
      onChange({ target: { name, value: "" } });
    }
    
    setIsOpen(false);
    
    if (onBlur) {
      onBlur({ target: { name, value: value } });
    }
  };
  
  // Componente personalizado para el botón de fecha
  const CustomInput = forwardRef(({ onClick }, ref) => (
    <div 
      onClick={onClick}
      ref={ref}
      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm cursor-pointer flex items-center justify-between shadow-sm hover:bg-gray-50 transition ${
        error ? "border-red-400" : isOpen ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)] ring-opacity-20" : "border-gray-300"
      }`}
    >
      <span className={selectedDate ? "text-gray-800" : "text-gray-400"}>
        {selectedDate ? formatDisplayDate(selectedDate) : "Selecciona una fecha"}
      </span>
      <Calendar
        size={18}
        className="text-gray-500"
      />
    </div>
  ));
  
  CustomInput.displayName = "CustomDateInput";

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
        {label} {label && "*"}
      </label>
      
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        onCalendarOpen={() => setIsOpen(true)}
        onCalendarClose={() => setIsOpen(false)}
        customInput={<CustomInput />}
        dateFormat="dd/MM/yyyy"
        locale="es"
        showPopperArrow={false}
        popperClassName="date-picker-popper"
        popperPlacement="bottom-start"
        calendarClassName="rounded-lg border border-gray-200 shadow-lg"
        wrapperClassName="w-full"
        todayButton="Hoy"
        placeholderText="Selecciona una fecha"
      />
      
      {/* Input oculto para mantener compatibilidad con el formulario */}
      <input
        type="hidden"
        name={name}
        value={value || ""}
        readOnly
      />
    </div>
  );
}
