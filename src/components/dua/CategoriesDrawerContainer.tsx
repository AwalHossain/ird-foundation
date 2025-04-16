import { useUI } from "@/contexts/UIContext";
import React from "react";
import CategoriesDrawer from "./CategoriesDrawer";

interface CategoriesDrawerContainerProps {
  children: React.ReactNode;
}

const CategoriesDrawerContainer: React.FC<CategoriesDrawerContainerProps> = ({ 
  children 
}) => {
  const { isCategoriesDrawerOpen, closeCategoriesDrawer } = useUI();
  
  return (
    <CategoriesDrawer
      isOpen={isCategoriesDrawerOpen}
      onOpenChange={closeCategoriesDrawer}
    >
      {children}
    </CategoriesDrawer>
  );
};

export default CategoriesDrawerContainer; 