export default function NoteTextarea({ value, onChange }) {
  return (
    <div className="col-span-2">
      <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
        Nota (opcional)
      </label>
      <textarea
        name="note"
        value={value}
        onChange={onChange}
        rows={3}
        placeholder="Ej: Descripción breve..."
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition resize-none min-h-[80px]"
      />
    </div>
  );
}