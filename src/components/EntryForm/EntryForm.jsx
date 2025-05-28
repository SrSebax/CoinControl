import TabsSwitcher from "../TabsSwitcher";
import EntryFields from "./EntryFields";
import SubmitButton from "../SubmitButton";
import useFormController from "../../controller/EntryFormController";

export default function EntryForm() {
  const {
    entryType,
    setEntryType,
    isExpense,
    formData,
    handleChange,
    handleSubmit,
  } = useFormController();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TabsSwitcher activeTab={entryType} setActiveTab={setEntryType} />
      <EntryFields
        isExpense={isExpense}
        formData={formData}
        handleChange={handleChange}
      />
      <SubmitButton isExpense={isExpense} />
    </form>
  );
}
