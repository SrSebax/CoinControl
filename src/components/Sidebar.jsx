import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X, LogOut } from "lucide-react";
import logoFull from "../assets/coin-control-light.svg";
import logoCollapsed from "../assets/pig-coin-control.svg";
import { itemsRoutes } from "../routes/itemsRoutes";

export default function Sidebar({ collapsed, mobileOpen, setMobileOpen }) {
  const { pathname } = useLocation();

  const baseClasses =
    "fixed inset-y-0 left-0 z-40 bg-[var(--color-sidebar)] border-r border-[var(--color-sidebar-border)] transition-all duration-300 ease-in-out";
  const widthClass = collapsed ? "w-16" : "w-64";
  const translateClass = mobileOpen ? "translate-x-0" : "-translate-x-full";

  const logoSrc = collapsed ? logoCollapsed : logoFull;
  const logoSizeClasses = collapsed ? "h-12 w-12" : "h-12 w-auto";

  return (
    <aside className={`${baseClasses} ${widthClass} ${translateClass} md:translate-x-0 md:static`}>
      <div className="flex flex-col h-full">

        {/* Logo y cerrar */}
        <div className="flex items-center justify-between px-4 py-4">
          <Link
            to="/"
            className="flex items-center justify-center transition-transform duration-200 hover:scale-105"
            aria-label="Inicio"
          >
            <img src={logoSrc} alt="CoinControl" className={logoSizeClasses} />
          </Link>
          <button
            className="md:hidden text-[var(--color-icon)]"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-1 px-2 flex-1 overflow-y-auto">
          {itemsRoutes.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition 
                ${pathname === path
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)]"
                }
              `}
              onClick={() => setMobileOpen(false)}
            >
              {icon}
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        {/* Botón de salir */}
        <div className="px-2 py-3 border-t border-[var(--color-sidebar-border)]">
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] transition"
            onClick={() => console.log("Cerrar sesión")}
          >
            <LogOut size={18} />
            {!collapsed && <span>Salir</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
