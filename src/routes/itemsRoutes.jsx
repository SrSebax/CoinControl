import {
  LayoutDashboard,
  PieChart,
  CreditCard,
  Settings,
  BarChart3,
  FolderKanban,
  PlusCircle,
} from "lucide-react";

export const itemsRoutes = [
  { path: "/", label: "Inicio", icon: <LayoutDashboard size={20} /> },
  { path: "/summary", label: "Resumen", icon: <PieChart size={20} /> },
  { path: "/payments", label: "Pagos", icon: <CreditCard size={20} /> },
  { path: "/charts", label: "Gráficos", icon: <BarChart3 size={20} /> },
  {
    path: "/new-entry",
    label: "Registrar Movimiento",
    icon: <PlusCircle size={20} />,
  },
  {
    path: "/categories",
    label: "Categorías",
    icon: <FolderKanban size={20} />,
  },

  { path: "/settings", label: "Configuración", icon: <Settings size={20} /> },
];
