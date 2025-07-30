import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { User, ChevronDown } from "lucide-react";
import { auth } from "../services/firebase";

export default function UserActions() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white hover:shadow-md transition-all duration-200 cursor-pointer"
        aria-label="Perfil de usuario"
      >
        <User size={18} className="text-teal-600" />
        <span className="hidden sm:inline text-sm font-semibold text-gray-700">
          {user?.displayName || user?.email?.split("@")[0] || "Mi cuenta"}
        </span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl py-4 px-4 z-50 animate-fade-in-up">
          <div className="mb-2">
            <p className="text-xs text-gray-500 mb-1">Sesión iniciada como:</p>
            <p className="text-sm font-medium text-gray-800 truncate">
              {user?.email}
            </p>
          </div>

          <div className="mt-3 text-xs text-gray-400 border-t pt-3 text-center">
            CoinControl <span className="font-semibold text-teal-500">v1.0</span>
          </div>
        </div>
      )}
    </div>
  );
}
