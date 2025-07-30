import { useState } from "react";
import Layout from "../components/Layout";
import TabsSwitcher from "../components/TabsSwitcher";
import PageHeading from "../components/PageHeading";

export default function CategoriesView() {
  const [activeTab, setActiveTab] = useState("gastos");

  return (
    <Layout>
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
        <div className="text-center sm:text-left">
          <PageHeading title="Registrar nueva categoría" />
          <TabsSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </Layout>
  );
}
