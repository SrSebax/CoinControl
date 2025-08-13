import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#f0f9ff] via-[#f4f6f8] to-[#edf7f6] text-[var(--color-text)] relative">
      {/* Overlay para mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          mobileOpen={mobileOpen}
          toggleMobile={toggleMobile}
        />

        {/* Contenido scrolleable */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 relative">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-teal-100/30 to-teal-200/20 blur-3xl"></div>
            <div className="absolute bottom-[-15%] left-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-blue-100/20 to-teal-200/10 blur-3xl"></div>
          </div>
          <div className="relative z-10">
          {children}
          </div>
        </main>
      </div>
    </div>
  );
}
