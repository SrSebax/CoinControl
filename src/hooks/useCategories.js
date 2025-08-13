import { useLocalStorage } from './useLocalStorage';
import { defaultCategories } from '../data/data';

export function useCategories() {
  const [categories, setCategories] = useLocalStorage('coinControl_categories', {
    expense: defaultCategories.expense,
    income: defaultCategories.income
  });

  // Agregar nueva categoría
  const addCategory = (category) => {
    const { type, name, color, icon } = category;
    
    const newCategory = {
      id: Date.now().toString(),
      name,
      color,
      icon
    };
    
    const typeKey = type === 'expense' ? 'expense' : 'income';
    
    const newCategories = {
      ...categories,
      [typeKey]: [...categories[typeKey], newCategory]
    };
    
    setCategories(newCategories);
    return newCategory;
  };

  // Eliminar categoría
  const deleteCategory = (categoryId, type) => {
    const typeKey = type === 'expense' ? 'expense' : 'income';
    
    const newCategories = {
      ...categories,
      [typeKey]: categories[typeKey].filter(c => c.id !== categoryId)
    };
    
    setCategories(newCategories);
  };
  
  // Actualizar categoría existente
  const updateCategory = (categoryId, type, updatedData) => {
    const typeKey = type === 'expense' ? 'expense' : 'income';
    
    const newCategories = {
      ...categories,
      [typeKey]: categories[typeKey].map(c => 
        c.id === categoryId ? { ...c, ...updatedData } : c
      )
    };
    
    setCategories(newCategories);
    
    return newCategories[typeKey].find(c => c.id === categoryId);
  };

  // Obtener categorías por tipo
  const getCategoriesByType = (type) => {
    const typeKey = type === 'expense' ? 'expense' : 'income';
    return categories[typeKey];
  };

  return {
    categories,
    addCategory,
    deleteCategory,
    updateCategory,
    getCategoriesByType
  };
}