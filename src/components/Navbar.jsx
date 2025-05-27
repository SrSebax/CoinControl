import React from "react";
import SidebarToggle from "./SidebarToggle";
import NavigationControls from "./NavigationControls";
import UserActions from "./UserActions";

export default function Navbar({ toggleSidebar, mobileOpen, toggleMobile }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow flex items-center justify-between px-4 py-3 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarToggle toggleSidebar={toggleSidebar} />
        <NavigationControls mobileOpen={mobileOpen} toggleMobile={toggleMobile} />
      </div>
      <UserActions />
    </header>
  );
}
