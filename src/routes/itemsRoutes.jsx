import {
  LayoutDashboard,
  PieChart,
  Settings,
  FolderKanban,
  PlusCircle,
  Wallet,
  Edit,
} from "lucide-react";

export const itemsRoutes = [
  { path: "/home", label: "Inicio", icon: <LayoutDashboard size={20} /> },
  { path: "/summary", label: "Resumen", icon: <PieChart size={20} /> },
  {
    path: "/new-entry",
    label: "Movimientos",
    icon: <PlusCircle size={20} />,
  },
  {
    path: "/categories",
    label: "Categorías",
    icon: <FolderKanban size={20} />,
  },
  {
    path: "/pockets",
    label: "Bolsillos",
    icon: <Wallet size={20} />,
  },
  { path: "/settings", label: "Configuración", icon: <Settings size={20} /> },
];
