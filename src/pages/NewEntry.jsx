import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";

export default function NewEntry() {
  const location = useLocation();
  const type = location.state?.type;

  const isExpense = type === "expense";
  const titulo = isExpense ? "Nuevo Gasto" : "Nuevo Ingreso";
  const boton = isExpense ? "Guardar gasto" : "Guardar ingreso";

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{titulo}</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Monto
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Ingresa el monto"
            />
          </div>

          {/* Aquí podrías agregar categoría, fecha, nota, etc. */}

          <button
            type="submit"
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:opacity-90"
          >
            {boton}
          </button>
        </form>
      </div>
    </Layout>
  );
}
