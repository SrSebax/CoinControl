import React from "react";
import SidebarToggle from "./SidebarToggle";
import NavigationControls from "./NavigationControls";
import UserActions from "./UserActions";
import NotificationAlert from "./NotificationAlert";

export default function Navbar({ toggleSidebar, mobileOpen, toggleMobile }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow flex items-center justify-between px-4 py-3 md:px-6">
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
