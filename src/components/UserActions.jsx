import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { LogOut } from "lucide-react";
import { auth } from "../services/firebase";
import { useLogoutController } from "../controller/LogoutController";
import ConfirmModal from "./ConfirmModal";

export default function UserActions() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useLogoutController();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    setShowLogoutModal(true);
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Botón de perfil */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="cursor-pointer flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0fdfa] transition-colors border border-transparent hover:border-[#48a99e]/30"
        >
          <div className="relative">
            <div className="w-9 h-9 bg-[#48a99e] rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">
                {getUserInitials(
                  user?.displayName || user?.email?.split("@")[0] || "Usuario"
                )}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm" />
          </div>

          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-800 truncate max-w-32">
              {user?.displayName ||
                user?.email?.split("@")[0] ||
                "Usuario"}
            </p>
            <p className="text-xs text-gray-500 truncate max-w-32">
              {user?.email || ""}
            </p>
          </div>

          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setDropdownOpen(false)}
            ></div>

            {/* Menú */}
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-[#e2e8f0] z-20 overflow-hidden">
              <div className="p-4 border-b border-[#e2e8f0]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#48a99e] rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      {getUserInitials(
                        user?.displayName ||
                          user?.email?.split("@")[0] ||
                          "Usuario"
                      )}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {user?.displayName ||
                        user?.email?.split("@")[0] ||
                        "Usuario"}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user?.email || ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <button
                  onClick={handleLogout}
                  className="cursor-pointer w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar sesión</span>
                </button>
              </div>

              <div className="px-3 py-2 text-center text-xs text-gray-400 border-t border-[#e2e8f0]">
                CoinControl <span className="font-semibold text-[#48a99e]">v1.0</span>
              </div>
            </div>
          </>
        )}
      </div>

      <ConfirmModal
        open={showLogoutModal}
        title="¿Cerrar sesión?"
        message="¿Estás seguro que deseas cerrar tu sesión?"
        onCancel={() => {
          setShowLogoutModal(false);
        }}
        onConfirm={() => {
          logout();
          setShowLogoutModal(false);
        }}
      />
    </>
  );
}
