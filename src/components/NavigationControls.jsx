import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NavigationControls({ mobileOpen, toggleMobile }) {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        title="Ir a la página anterior"
        className="hidden md:inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        aria-label="Atrás"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={() => navigate(1)}
        title="Ir a la página siguiente"
        className="hidden md:inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        aria-label="Adelante"
      >
        <ChevronRight size={22} />
      </button>

      <button
        onClick={toggleMobile}
        title={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        className="md:hidden text-gray-600 hover:text-gray-900 mr-1"
        aria-label="Alternar menú móvil"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </>
  );
}
