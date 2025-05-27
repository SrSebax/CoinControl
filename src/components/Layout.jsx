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
    <div className="min-h-screen flex bg-[var(--color-background)] text-[var(--color-text)] relative">
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

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          mobileOpen={mobileOpen}
          toggleMobile={toggleMobile}
        />

        <main className="flex-1 px-4 py-6 md:px-6 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}