// src/app/(shell)/layout.tsx
"use client";

import Header from "@/components/nav/Header";
import Sidebar from "@/components/nav/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UIProvider } from "@/contexts/UIContext";


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <TooltipProvider>
      <UIProvider>

        <div className="flex min-h-screen">
          {/* Desktop-only sidebar spacer - hidden on mobile */}
          <div className="hidden lg:block lg:w-[100px] lg:shrink-0">
            {/* Empty div to reserve space for the fixed sidebar */}
            <Sidebar />
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4 md:p-6 md:pl-4 pb-20 md:pb-4">
              {children}
            </main>
          </div>

          {/* Sidebar is positioned by its own component styles */}
          <Sidebar />
        </div>
      </UIProvider>
    </TooltipProvider>
  );
}