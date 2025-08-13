import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Edit, PlusCircle } from "lucide-react";
import logoFull from "../assets/coin-control-light.svg";
import logoCollapsed from "../assets/pig-coin-control.svg";
import nordwareFullLogo from "../assets/nørdware/nordware-full-dark.svg";
import nordwareSmallLogo from "../assets/nørdware/nordware-logo-dark.svg";
import { itemsRoutes } from "../routes/itemsRoutes";

export default function Sidebar({ collapsed, mobileOpen, setMobileOpen }) {
  const { pathname } = useLocation();

  const baseClasses =
    "fixed inset-y-0 left-0 z-40 bg-[var(--color-sidebar)]/95 backdrop-blur-md border-r border-[var(--color-sidebar-border)] transition-all duration-300 ease-in-out h-screen flex flex-col shadow-lg";
  const widthClass = collapsed ? "w-16" : "w-64";
  const translateClass = mobileOpen ? "translate-x-0" : "-translate-x-full";

  const logoSrc = collapsed ? logoCollapsed : logoFull;
  const logoSizeClasses = "h-12 transition-all duration-300";

  return (
    <>
      <aside
        className={`${baseClasses} ${widthClass} ${translateClass} md:translate-x-0 md:static`}
      >
        {/* Cabecera fija */}
        <div className="flex items-center justify-between px-4 py-4 shrink-0">
          <Link
            to="/"
            className="flex items-center justify-center transition-transform duration-300 hover:scale-105"
            aria-label="Inicio"
          >
            <img
              src={logoSrc}
              alt="CoinControl"
              className={`${logoSizeClasses} ${collapsed ? "w-12" : "w-auto"}`}
            />
          </Link>
          <button
            className="md:hidden text-[var(--color-icon)] transition hover:scale-110"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={22} />
          </button>
        </div>

        {/* Contenedor central con scroll */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {/* Navegación con scroll */}
          <nav className="flex flex-col gap-1 px-2 flex-1">
            {itemsRoutes.map(({ path, label, icon }) => {
              // Verificar si es la ruta de categorías para agregar la opción de crear
              if (path === "/categories") {
                return (
                  <React.Fragment key={path}>
                    <Link
                      to={path}
                      className={`
                      flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                      ${
                        pathname === path && 
                        !(path === "/categories" && (pathname === "/select-category" || pathname.startsWith("/edit-category/"))) &&
                        !(path === "/new-entry" && (pathname === "/select-entry" || pathname.startsWith("/edit-entry/")))
                          ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md scale-[1.02]"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:scale-[1.02] hover:shadow-sm"
                      }
                    `}
                      onClick={() => setMobileOpen(false)}
                    >
                      {icon}
                      {!collapsed && (
                        <span className="transition-opacity duration-200">
                          {label}
                        </span>
                      )}
                    </Link>
                    {!collapsed && (
                      <Link
                        to="/select-category"
                        className={`
                        flex items-center gap-3 px-3 py-2 ml-4 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                        ${
                          pathname === "/select-category" || pathname.startsWith("/edit-category/")
                            ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md scale-[1.02]"
                            : "text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:scale-[1.02] hover:shadow-sm"
                        }
                      `}
                        onClick={() => setMobileOpen(false)}
                      >
                        <Edit size={18} />
                        <span className="transition-opacity duration-200">
                          Editar Categoría
                        </span>
                      </Link>
                    )}
                  </React.Fragment>
                );
              }
              
              // Verificar si es la ruta de movimientos para agregar la opción de crear
              if (path === "/new-entry") {
                return (
                  <React.Fragment key={path}>
                    <Link
                      to={path}
                      className={`
                      flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                      ${
                        pathname === path && 
                        !(path === "/categories" && (pathname === "/select-category" || pathname.startsWith("/edit-category/"))) &&
                        !(path === "/new-entry" && (pathname === "/select-entry" || pathname.startsWith("/edit-entry/")))
                          ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md scale-[1.02]"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:scale-[1.02] hover:shadow-sm"
                      }
                    `}
                      onClick={() => setMobileOpen(false)}
                    >
                      {icon}
                      {!collapsed && (
                        <span className="transition-opacity duration-200">
                          {label}
                        </span>
                      )}
                    </Link>
                    {!collapsed && (
                      <Link
                        to="/select-entry"
                        className={`
                        flex items-center gap-3 px-3 py-2 ml-4 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                        ${
                          pathname === "/select-entry" || pathname.startsWith("/edit-entry/")
                            ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md scale-[1.02]"
                            : "text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:scale-[1.02] hover:shadow-sm"
                        }
                      `}
                        onClick={() => setMobileOpen(false)}
                      >
                        <Edit size={18} />
                        <span className="transition-opacity duration-200">
                          Editar Movimiento
                        </span>
                      </Link>
                    )}
                  </React.Fragment>
                );
              }
              
              // Para las demás rutas, mantener el comportamiento original
              return (
                <Link
                  key={path}
                  to={path}
                  className={`
                  flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                  ${
                    pathname === path
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md scale-[1.02]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:scale-[1.02] hover:shadow-sm"
                  }
                `}
                  onClick={() => setMobileOpen(false)}
                >
                  {icon}
                  {!collapsed && (
                    <span className="transition-opacity duration-200">
                      {label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer fijo */}
        <div className="shrink-0">
          {/* Logo de Nørdware */}
          <div className="px-4 py-4 border-t border-[var(--color-sidebar-border)] flex flex-col items-center space-y-2">
            {collapsed ? (
              <div className="relative group flex items-center justify-center">
                <img
                  src={nordwareSmallLogo}
                  alt="Nørdware"
                  className="w-8 h-8 opacity-90 hover:opacity-100 transition-opacity duration-200 drop-shadow-sm"
                />
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 text-xs font-medium text-white bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  Creado por Nørdware
                </span>
              </div>
            ) : (
              <>
                <img
                  src={nordwareFullLogo}
                  alt="Nørdware"
                  className="w-36 opacity-80 transition-all duration-300"
                />
                <p className="text-[11px] text-[var(--color-text-secondary)] text-center leading-tight">
                  Creado por Nørdware
                </p>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
