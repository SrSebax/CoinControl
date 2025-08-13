import React from "react";
import SidebarToggle from "./SidebarToggle";
import NavigationControls from "./NavigationControls";
import UserActions from "./UserActions";
import NotificationAlert from "./NotificationAlert";

export default function Navbar({ toggleSidebar, mobileOpen, toggleMobile }) {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm flex items-center justify-between px-4 py-4 md:px-6 sticky top-0 z-20 transition-all duration-300">
      {/* Lado izquierdo */}
      <div className="flex items-center gap-2">
        <SidebarToggle toggleSidebar={toggleSidebar} />
        <NavigationControls mobileOpen={mobileOpen} toggleMobile={toggleMobile} />
      </div>

      {/* Lado derecho: Notificación + Usuario */}
      <div className="flex items-center gap-3 ml-auto">
        <NotificationAlert />
        <UserActions />
      </div>
    </header>
  );
}
