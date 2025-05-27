import { LayoutDashboard, PieChart, CreditCard, Settings } from "lucide-react";

export const navItems = [
  { path: "/", label: "Inicio", icon: <LayoutDashboard size={20} /> },
  { path: "/summary", label: "Resumen", icon: <PieChart size={20} /> },
  { path: "/payments", label: "Pagos", icon: <CreditCard size={20} /> },
  { path: "/settings", label: "Configuración", icon: <Settings size={20} /> }
];