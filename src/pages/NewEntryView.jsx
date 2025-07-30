import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TabsSwitcher from "../components/TabsSwitcher";
import PageHeading from "../components/PageHeading";
import SubmitButton from "../components/SubmitButton";
import AmountInput from "../components/inputs/AmountInput";
import SelectInput from "../components/inputs/SelectInput";
import DateInput from "../components/inputs/DateInput";
import NoteTextarea from "../components/inputs/NoteTextarea";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { expenseCategories, incomeCategories } from "../data/data";

export default function NewEntryView() {
  const [activeTab, setActiveTab] = useState("gastos");
  const isExpense = activeTab === "gastos";

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isEmpty = (field) =>
    touched[field] && (!formData[field] || formData[field].trim() === "");

  const isFormValid = formData.amount && formData.category && formData.date;

  useEffect(() => {
    if (!formData.date) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const localDate = `${yyyy}-${mm}-${dd}`;
      handleChange({ target: { name: "date", value: localDate } });
    }
  }, [formData.date]);

  const categorias = isExpense ? expenseCategories : incomeCategories;

  return (
    <Layout>
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
        <div className="text-center sm:text-left">
          <PageHeading title="Registrar nuevo movimiento" />
          <TabsSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="space-y-6">
          <AmountInput
            value={formData.amount}
            onChange={handleChange}
            onBlur={() => setTouched((prev) => ({ ...prev, amount: true }))}
            error={isEmpty("amount")}
          />

          {/* Agrupar Categoría y Fecha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectInput
              options={categorias}
              value={formData.category}
              onChange={handleChange}
              onBlur={() => setTouched((prev) => ({ ...prev, category: true }))}
              error={isEmpty("category")}
            />

            <DateInput
              value={formData.date}
              onChange={handleChange}
              onBlur={() => setTouched((prev) => ({ ...prev, date: true }))}
              error={isEmpty("date")}
            />
          </div>

          <NoteTextarea value={formData.note} onChange={handleChange} />

          <SubmitButton
            label={isExpense ? "Guardar gasto" : "Guardar ingreso"}
            Icon={isExpense ? ArrowDownCircle : ArrowUpCircle}
            color={
              isExpense
                ? "bg-[var(--color-expense)] hover:bg-[var(--color-expense-hover)]"
                : "bg-[var(--color-income)] hover:bg-[var(--color-income-hover)]"
            }
            text={
              isExpense
                ? "text-[var(--color-expense-text)]"
                : "text-[var(--color-income-text)]"
            }
            disabled={!isFormValid}
          />
        </div>
      </div>
    </Layout>
  );
}
