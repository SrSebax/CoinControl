import { useState } from "react";
import SelectInput from "../components/inputs/SelectInput";

export default function SelectInputExample() {
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    paymentMethod: "",
    status: ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Ejemplo de opciones como array de strings
  const countries = ["España", "México", "Argentina", "Colombia", "Chile"];
  
  // Ejemplo de opciones como array de objetos con value y label
  const cities = [
    { value: "madrid", label: "Madrid" },
    { value: "barcelona", label: "Barcelona" },
    { value: "cdmx", label: "Ciudad de México" },
    { value: "buenos_aires", label: "Buenos Aires" }
  ];
  
  // Ejemplo de opciones como array de objetos con claves personalizadas
  const paymentMethods = [
    { id: "credit", name: "Tarjeta de Crédito" },
    { id: "debit", name: "Tarjeta de Débito" },
    { id: "cash", name: "Efectivo" },
    { id: "transfer", name: "Transferencia" }
  ];
  
  // Ejemplo de opciones con valores numéricos
  const statusOptions = [
    { code: 1, description: "Pendiente" },
    { code: 2, description: "En proceso" },
    { code: 3, description: "Completado" },
    { code: 4, description: "Cancelado" }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Ejemplos de SelectInput</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ejemplo con array de strings */}
        <SelectInput
          options={countries}
          value={formData.country}
          onChange={handleChange}
          name="country"
          label="País"
          required={true}
          placeholder="Selecciona un país"
        />
        
        {/* Ejemplo con array de objetos con value y label */}
        <SelectInput
          options={cities}
          value={formData.city}
          onChange={handleChange}
          name="city"
          label="Ciudad"
          placeholder="Selecciona una ciudad"
        />
        
        {/* Ejemplo con array de objetos con claves personalizadas */}
        <SelectInput
          options={paymentMethods}
          value={formData.paymentMethod}
          onChange={handleChange}
          name="paymentMethod"
          label="Método de pago"
          valueKey="id"
          labelKey="name"
          placeholder="Selecciona un método de pago"
          iconSize={16}
        />
        
        {/* Ejemplo con valores numéricos y sin icono */}
        <SelectInput
          options={statusOptions}
          value={formData.status}
          onChange={handleChange}
          name="status"
          label="Estado"
          valueKey="code"
          labelKey="description"
          placeholder="Selecciona un estado"
          showIcon={false}
          className="bg-gray-50"
        />
      </div>
      
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="font-semibold mb-2">Valores seleccionados:</h2>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
}