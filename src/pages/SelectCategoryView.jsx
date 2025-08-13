import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import TabsSwitcher from "../components/TabsSwitcher";
import PageHeading from "../components/PageHeading";
import ConfirmModal from "../components/ConfirmModal";
import { Edit, Search, X, Trash2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useCategories } from "../hooks/useCategories";

export default function SelectCategoryView() {
  const navigate = useNavigate();
  const { categories, deleteCategory } = useCategories();
  
  const [activeTab, setActiveTab] = useState("gastos");
  const isExpense = activeTab === "gastos";
  const typeKey = isExpense ? "expense" : "income";
  
  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado para el modal de confirmación
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    message: "",
    data: null,
    action: ""
  });
  
  // Lista de categorías según el tipo activo
  const categoryList = useMemo(() => categories[typeKey] || [], [categories, typeKey]);
  
  // Lista filtrada según el término de búsqueda
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categoryList;
    return categoryList.filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categoryList, searchTerm]);
  
  const handleEditCategory = (category) => {
    // Navegar a la ruta de edición de categoría
    navigate(`/edit-category/${category.id}`, {
      state: {
        type: typeKey
      }
    });
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
  
  const handleDeleteCategory = (categoryId) => {
    setConfirmModal({
      open: true,
      title: "¿Eliminar categoría?",
      message: "¿Estás seguro de eliminar esta categoría? Esta acción no se puede deshacer.",
      data: categoryId,
      action: "delete"
    });
  };
  
  const handleConfirmDelete = async () => {
    try {
      if (confirmModal.action === "delete" && confirmModal.data) {
        // Eliminar categoría
        deleteCategory(confirmModal.data, typeKey);
        
        // Mostrar mensaje de éxito (podrías implementar un sistema de notificaciones)
      }
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    } finally {
      setConfirmModal({ open: false, title: "", message: "", data: null, action: "" });
    }
  };
  
  const handleCancelDelete = () => {
    setConfirmModal({ open: false, title: "", message: "", data: null, action: "" });
  };

  // Función para renderizar el icono de la categoría
  const renderCategoryIcon = (iconName) => {
    if (!iconName || !LucideIcons[iconName]) return null;
    const IconComponent = LucideIcons[iconName];
    return <IconComponent size={24} />;
  };

  return (
    <Layout>
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
        <div className="text-center sm:text-left">
          <PageHeading title="Seleccionar categoría para editar" />
          <TabsSwitcher activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>
        
        {/* Lista de categorías */}
        <div className="mt-6 border border-gray-100 rounded-lg shadow-sm">
          <div className="sticky top-0 z-10">
            <h3 className="text-md font-medium text-gray-900 p-3 bg-gray-50 border-b">
              {isExpense ? "Categorías de gastos" : "Categorías de ingresos"} ({categoryList.length})
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
                  placeholder="Buscar categoría..."
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
            {categoryList.length === 0 ? (
              <p className="text-gray-500 italic p-4 text-center text-sm">No hay categorías registradas</p>
            ) : filteredCategories.length === 0 ? (
              <p className="text-gray-500 italic p-4 text-center text-sm">No se encontraron resultados para "{searchTerm}"</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {filteredCategories.map((category) => (
                <li 
                  key={category.id}
                  className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  style={{ borderLeftColor: category.color, borderLeftWidth: '3px' }}
                  onClick={() => handleEditCategory(category)}
                >
                  <div className="flex items-center">
                    {category.icon && (
                      <div className="mr-2 flex-shrink-0" style={{ color: category.color }}>
                        {renderCategoryIcon(category.icon)}
                      </div>
                    )}
                    <span className="font-medium text-sm">{category.name}</span>
                  </div>
                  
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCategory(category);
                      }}
                      className="p-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:bg-teal-50 rounded-full transition-colors shadow-sm hover:shadow"
                      aria-label="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category.id);
                      }}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors shadow-sm hover:shadow"
                      aria-label="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
                ))}
              </ul>
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