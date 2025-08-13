import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import TabsSwitcher from "../components/TabsSwitcher";
import PageHeading from "../components/PageHeading";
import ConfirmModal from "../components/ConfirmModal";
import { Edit, Search, X, Trash2 } from "lucide-react";
import { useTransactions } from "../hooks/useLocalStorage";

export default function SelectEntryView() {
  const navigate = useNavigate();
  const { getTransactionsByPeriod, deleteTransaction } = useTransactions();
  
  const [activeTab, setActiveTab] = useState("gastos");
  const isExpense = activeTab === "gastos";
  
  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado para el modal de confirmación
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    transactionId: null,
    title: "",
    message: ""
  });
  
  // Obtener transacciones del mes actual por tipo
  const currentTransactions = getTransactionsByPeriod().filter(t => 
    isExpense ? t.type === 'expense' : t.type === 'income'
  );
  
  // Lista filtrada según el término de búsqueda
  const filteredTransactions = searchTerm.trim() 
    ? currentTransactions.filter(transaction => 
        transaction.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.note?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : currentTransactions;
  
  const handleEditTransaction = (transaction) => {
    navigate(`/edit-entry/${transaction.id}`);
  };
  
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchTerm("");
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const clearSearch = () => {
    setSearchTerm("");
  };
  
  const handleDeleteClick = (transaction) => {
    setConfirmModal({
      open: true,
      transactionId: transaction.id,
      title: "¿Eliminar movimiento?",
      message: `¿Estás seguro de que deseas eliminar "${transaction.name || 'Sin nombre'}" por ${formatCurrency(transaction.amount)}? Esta acción no se puede deshacer.`
    });
  };
  
  const handleConfirmDelete = () => {
    if (confirmModal.transactionId) {
      deleteTransaction(confirmModal.transactionId);
      setConfirmModal({ open: false, transactionId: null, title: "", message: "" });
    }
  };
  
  const handleCancelDelete = () => {
    setConfirmModal({ open: false, transactionId: null, title: "", message: "" });
  };

  const formatCurrency = (value) =>
    `$${value.toLocaleString("es-CO", { minimumFractionDigits: 2 })}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
        <div className="text-center sm:text-left">
          <PageHeading title="Seleccionar movimiento para editar" />
          <TabsSwitcher activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>
        
        {/* Lista de transacciones */}
        <div className="mt-6 border border-gray-100 rounded-lg shadow-sm">
          <div className="sticky top-0 z-10">
            <h3 className="text-md font-medium text-gray-900 p-3 bg-gray-50 border-b">
              {isExpense ? "Gastos" : "Ingresos"} ({currentTransactions.length})
            </h3>
            
            {/* Campo de búsqueda */}
            <div className="relative p-2 bg-white border-b">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <div className="pl-3 text-gray-400">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Buscar movimiento..."
                  className="w-full py-2 px-2 text-sm focus:outline-none"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="pr-3 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {currentTransactions.length === 0 ? (
              <p className="text-gray-500 italic p-4 text-center text-sm">No hay {isExpense ? 'gastos' : 'ingresos'} registrados</p>
            ) : filteredTransactions.length === 0 ? (
              <p className="text-gray-500 italic p-4 text-center text-sm">No se encontraron resultados para "{searchTerm}"</p>
            ) : (
              <div className="space-y-3 p-3">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className={`flex items-center justify-between p-4 rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
                      isExpense 
                        ? 'bg-red-50/50 border-red-100 hover:bg-red-50' 
                        : 'bg-green-50/50 border-green-100 hover:bg-green-50'
                    }`}
                    onClick={() => handleEditTransaction(transaction)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800 text-lg">{transaction.name || 'Sin nombre'}</h4>
                        <span className={`font-bold text-lg ${
                          isExpense ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {isExpense ? '-' : '+'}{formatCurrency(transaction.amount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div>
                          <span className="text-sm text-gray-500">
                            {transaction.category || 'Sin categoría'}
                          </span>
                          {transaction.note && (
                            <p className="text-xs text-gray-400 mt-1 italic">
                              {transaction.note}
                            </p>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(transaction.date)}
                        </span>
                      </div>
                    </div>
                    <div className="flex ml-3 space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTransaction(transaction);
                        }}
                        className="p-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:bg-teal-50 rounded-full transition-colors shadow-sm hover:shadow"
                        title="Editar transacción"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(transaction);
                        }}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors shadow-sm hover:shadow"
                        title="Eliminar transacción"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal de confirmación */}
      <ConfirmModal
        open={confirmModal.open}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Layout>
  );
}