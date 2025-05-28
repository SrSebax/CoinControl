// src/components/EntryForm/EntryFormController.js
import { useState, useEffect } from "react";

export default function useFormController() {
  const [entryType, setEntryType] = useState("gastos");
  const isExpense = entryType === "gastos";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📤 Formulario enviado:", {
      tipo: entryType,
      ...formData,
    });
    setFormData({ amount: "", category: "", date: "", note: "" });
  };

  // Mostrar en consola en tiempo real
  useEffect(() => {
    console.clear();
    console.log("🧾 Estado actual del formulario:", {
      tipo: entryType,
      ...formData,
    });
  }, [formData, entryType]);

  return {
    entryType,
    setEntryType,
    isExpense,
    formData,
    handleChange,
    handleSubmit,
  };
}
