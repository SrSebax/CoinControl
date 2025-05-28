import { useState } from "react";
import Layout from "../components/Layout";
import TabsSwitcher from "../components/TabsSwitcher";
import TabPanelContent from "../components/TabPanelContent";
import TableSummary from "../components/TableSummary";

export default function HomeView() {
  const [activeTab, setActiveTab] = useState("gastos");

  const ingresosQuincenales = 1090000;
  const gastosQuincenales = 680000;

  return (
    <Layout>
      <div className="px-2 py-2">
        <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">
          Bienvenido a CoinControl
        </h2>

        <TabsSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
        <TableSummary
          ingresos={ingresosQuincenales}
          gastos={gastosQuincenales}
        />
        <TabPanelContent activeTab={activeTab} />
      </div>
    </Layout>
  );
}
