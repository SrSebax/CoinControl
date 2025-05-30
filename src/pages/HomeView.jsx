import { useState } from "react";
import Layout from "../components/Layout";
import TabsSwitcher from "../components/TabsSwitcher";
import TabPanelContent from "../components/TabPanelContent";
import TableSummary from "../components/TableSummary";
import PageHeading from "../components/PageHeading";

export default function HomeView() {
  const [activeTab, setActiveTab] = useState("gastos");

  const ingresosQuincenales = 1090000;
  const gastosQuincenales = 680000;

  return (
    <Layout>
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
        <div className="text-center sm:text-left">
          <PageHeading title="Bienvenido a CoinControl" />
          <TabsSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <TableSummary
          ingresos={ingresosQuincenales}
          gastos={gastosQuincenales}
        />
        <TabPanelContent activeTab={activeTab} />
      </div>
    </Layout>
  );
}
