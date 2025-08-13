import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import TabsSwitcher from "../components/TabsSwitcher";
import TabPanelContent from "../components/TabPanelContent";
import TableSummary from "../components/TableSummary";
import PageHeading from "../components/PageHeading";
import { useTransactions } from "../hooks/useLocalStorage";
import ToastMessage from "../components/ToastMessage";

export default function HomeView() {
  const [activeTab, setActiveTab] = useState("gastos");
  const [toast, setToast] = useState(null);
  const location = useLocation();
  const { summary } = useTransactions();

  useEffect(() => {
    if (location.state?.message) {
      setToast({
        message: location.state.message,
        type: location.state.type || 'success'
      });
      
      // Limpiar el estado de navegación
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const closeToast = () => {
    setToast(null);
  };

  return (
    <Layout>
      {toast && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
      
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6 transition-all duration-300 hover:shadow-xl">
        <div className="text-center sm:text-left">
          <PageHeading title="Bienvenido a CoinControl" />
          <TabsSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <TableSummary
          ingresos={summary.ingresos}
          gastos={summary.gastos}
        />
        <TabPanelContent activeTab={activeTab} />
      </div>
    </Layout>
  );
}
