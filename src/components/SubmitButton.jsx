export default function SubmitButton({ isExpense }) {
  return (
    <div className="pt-2">
      <button
        type="submit"
        className="w-full py-3 px-4 bg-[var(--color-primary)] text-white font-semibold text-sm rounded-lg shadow hover:opacity-90 transition"
      >
        {isExpense ? "Guardar gasto" : "Guardar ingreso"}
      </button>
    </div>
  );
}
