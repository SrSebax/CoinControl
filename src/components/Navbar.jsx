import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Search,
  Bell,
  User,
} from "lucide-react";

export default function Navbar({ collapsed, toggleSidebar, mobileOpen, toggleMobile }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow flex items-center justify-between px-4 py-3 md:px-6">
      <div className="flex items-center">
        {/* Desktop sidebar toggle */}
        <button
          className="hidden md:inline-flex text-gray-600 hover:text-gray-900 mr-3"
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-900 mr-3"
          onClick={toggleMobile}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search (oculto en móviles) */}
        <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-2 py-1">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Buscar..."
            className="ml-2 bg-transparent focus:outline-none text-gray-700 text-sm"
          />
        </div>

        {/* Notificaciones */}
        <button className="relative p-1 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Perfil de usuario */}
        <div className="relative">
          <button className="flex items-center space-x-2 focus:outline-none">
            <User size={20} className="text-gray-600" />
            <span className="hidden sm:inline text-sm text-gray-700">Mi Cuenta</span>
          </button>
        </div>
      </div>
    </header>
  );
}