import { Menu } from "lucide-react";

export default function SidebarToggle({ toggleSidebar }) {
  return (
    <button
      onClick={toggleSidebar}
      className="hidden md:inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      aria-label="Alternar sidebar"
    >
      <Menu size={22} />
    </button>
  );
}
