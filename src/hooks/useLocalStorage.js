import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Obtener el valor inicial del localStorage o usar el valor por defecto
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar el valor en localStorage
  const setValue = (value) => {
    try {
      // Permitir que value sea una función para que tengamos la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error al guardar en localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Hook específico para manejar transacciones financieras
export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage('coinControl_transactions', []);
  const [summary, setSummary] = useLocalStorage('coinControl_summary', {
    ingresos: 0,
    gastos: 0
  });

  // Calcular resumen basado en las transacciones
  const calculateSummary = (transactionsList) => {
    const summary = transactionsList.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        acc.ingresos += transaction.amount;
      } else {
        acc.gastos += transaction.amount;
      }
      return acc;
    }, { ingresos: 0, gastos: 0 });
    
    return summary;
  };

  // Agregar nueva transacción
  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...transaction
    };
    
    const newTransactions = [...transactions, newTransaction];
    setTransactions(newTransactions);
    
    // Actualizar resumen
    const newSummary = calculateSummary(newTransactions);
    setSummary(newSummary);
    
    return newTransaction;
  };

  // Eliminar transacción
  const deleteTransaction = (transactionId) => {
    const newTransactions = transactions.filter(t => t.id !== transactionId);
    setTransactions(newTransactions);
    
    // Actualizar resumen
    const newSummary = calculateSummary(newTransactions);
    setSummary(newSummary);
  };
  
  // Actualizar transacción existente
  const updateTransaction = (transactionId, updatedData) => {
    const newTransactions = transactions.map(t => 
      t.id === transactionId ? { ...t, ...updatedData } : t
    );
    
    setTransactions(newTransactions);
    
    // Actualizar resumen
    const newSummary = calculateSummary(newTransactions);
    setSummary(newSummary);
    
    return newTransactions.find(t => t.id === transactionId);
  };

  // Obtener transacciones por tipo
  const getTransactionsByType = (type) => {
    return transactions.filter(t => t.type === type);
  };

  // Obtener transacciones por período (mes actual)
  const getTransactionsByPeriod = (period = 'current') => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });
  };

  return {
    transactions,
    summary,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getTransactionsByType,
    getTransactionsByPeriod,
    calculateSummary
  };
} 