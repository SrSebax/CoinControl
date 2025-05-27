// src/components/Navbar/UserActions.jsx
import { Bell, User } from "lucide-react";

export default function UserActions() {
  return (
    <div className="flex items-center space-x-4">
      <button className="relative p-1 rounded-full hover:bg-gray-100">
        <Bell size={20} className="text-gray-600" />
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
      </button>

      <div className="relative">
        <button
          className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition"
          aria-label="Perfil de usuario"
        >
          <User size={20} className="text-gray-600" />
          <span className="hidden sm:inline text-sm text-gray-700">Mi cuenta</span>
        </button>
      </div>
    </div>
  );
}
