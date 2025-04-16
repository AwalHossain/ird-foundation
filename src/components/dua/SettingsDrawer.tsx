import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Settings } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { SettingsPanel } from "./SettingsPanel";

interface SettingsDrawerProps {
  className?: string;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ className }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={`p-2 rounded-full bg-white ${className}`}
        >
          <Settings size={22} className="text-green-400" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 overflow-y-auto bg-white">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-custom-gray-dark text-xl font-bold font-poppins text-center">
            Settings
          </SheetTitle>
        </SheetHeader>
        <div className="pt-2">
          <SettingsPanel />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsDrawer; 