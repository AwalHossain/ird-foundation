import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import React from "react";

interface CategoriesDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const CategoriesDrawer: React.FC<CategoriesDrawerProps> = ({ 
  isOpen, 
  onOpenChange,
  children 
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 overflow-y-auto bg-white w-[360px] sm:max-w-sm">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-custom-gray-dark text-xl font-bold font-poppins text-center">
            Categories
          </SheetTitle>
        </SheetHeader>
        <div className="pt-2 overflow-y-auto">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CategoriesDrawer; 