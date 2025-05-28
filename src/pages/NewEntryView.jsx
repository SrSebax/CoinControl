import EntryForm from "../components/EntryForm/EntryForm";
import Layout from "../components/Layout";

export default function NewEntryView() {
  return (
    <Layout>
      <div className="px-2 py-2">
        <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">
          Registrar nuevo movimiento
        </h2>
        <EntryForm />
      </div>
    </Layout>
  );
}
