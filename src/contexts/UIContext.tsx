import { createContext, ReactNode, useContext, useState } from 'react';

interface UIContextType {
  isCategoriesDrawerOpen: boolean;
  toggleCategoriesDrawer: () => void;
  openCategoriesDrawer: () => void;
  closeCategoriesDrawer: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isCategoriesDrawerOpen, setIsCategoriesDrawerOpen] = useState(false);

  const toggleCategoriesDrawer = () => {
    setIsCategoriesDrawerOpen(prev => !prev);
  };

  const openCategoriesDrawer = () => {
    setIsCategoriesDrawerOpen(true);
  };

  const closeCategoriesDrawer = () => {
    setIsCategoriesDrawerOpen(false);
  };

  return (
    <UIContext.Provider
      value={{
        isCategoriesDrawerOpen,
        toggleCategoriesDrawer,
        openCategoriesDrawer,
        closeCategoriesDrawer
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
} 