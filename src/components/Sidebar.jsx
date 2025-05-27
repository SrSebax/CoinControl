import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import logoFull from "../assets/coin-control-light.svg";
import logoCollapsed from "../assets/CoinControl.svg";
import { navItems } from "../routes/NavRoutes";

export default function Sidebar({ collapsed, mobileOpen, setMobileOpen }) {
  const { pathname } = useLocation();

  const baseClasses =
    "fixed inset-y-0 left-0 z-40 bg-[var(--color-sidebar)] border-r border-[var(--color-sidebar-border)] transition-all duration-300 ease-in-out";
  const widthClass = collapsed ? "w-16" : "w-64";
  const translateClass = mobileOpen ? "translate-x-0" : "-translate-x-full";

  // Selecciona el logo según el estado
  const logoSrc = collapsed ? logoCollapsed : logoFull;
  const logoSizeClasses = collapsed ? "h-12 w-12" : "h-12 w-auto";

  return (
    <aside className={`${baseClasses} ${widthClass} ${translateClass} md:translate-x-0 md:static`}>
      <div className="flex flex-col h-full">
        {/* Logo y cerrar móvil */}
        <div className="flex items-center justify-between px-4 py-4">
          <Link
            to="/"
            className={`
              flex items-center justify-center
              transition-transform duration-200 ease-in-out
              hover:scale-105
            `}
            aria-label="Ir a Inicio"
          >
            <img
              src={logoSrc}
              alt="CoinControl"
              className={logoSizeClasses}
            />
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
        <nav className="flex flex-col gap-2 px-2">
          {navItems.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors 
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
      </div>
    </aside>
  );
}
