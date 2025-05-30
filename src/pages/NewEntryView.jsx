import { useState } from "react";
import EntryFields from "../components/EntryForm/EntryFields";
import Layout from "../components/Layout";
import TabsSwitcher from "../components/TabsSwitcher";
import PageHeading from "../components/PageHeading";

export default function NewEntryView() {
  const [activeTab, setActiveTab] = useState("gastos");
  const isExpense = activeTab === "gastos";

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
        <div className="text-center sm:text-left">
          <PageHeading title="Registrar nuevo movimiento" />
          <TabsSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div>
          <EntryFields
            isExpense={isExpense}
            formData={formData}
            handleChange={handleChange}
          />
        </div>
      </div>
    </Layout>
  );
}
