import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const { addToast } = useToast();

  const toggleCompare = (product) => {
    const exists = compareItems.some((item) => item.id === product.id);
    if (exists) {
      setCompareItems((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`${product.name} removed from comparison`, 'info');
    } else {
      if (compareItems.length >= 4) {
        addToast('You can compare a maximum of 4 products at a time.', 'warning', 'Compare Limit');
        return;
      }
      setCompareItems((prev) => [...prev, product]);
      addToast(`${product.name} added to comparison list`, 'success');
    }
  };

  const isInCompare = (productId) => {
    return compareItems.some((item) => item.id === productId);
  };

  const removeFromCompare = (productId) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCompare = () => setCompareItems([]);

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        toggleCompare,
        isInCompare,
        removeFromCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error('useCompare must be used within CompareProvider');
  return context;
};
