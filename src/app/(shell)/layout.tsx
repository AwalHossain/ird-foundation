// src/app/(shell)/layout.tsx
"use client";

import Header from "@/components/nav/Header";
import Sidebar from "@/components/nav/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UIProvider } from "@/contexts/UIContext";

// Header height constant - use this for calculations
export const HEADER_HEIGHT = 64;

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const [sidebarOpen, setSidebarOpen] = useState(false);
  //   const [isMobile, setIsMobile] = useState(false);

  //   // Detect mobile screen on mount and resize
  //   useEffect(() => {
  //     const checkSize = () => setIsMobile(window.innerWidth < 768);
  //     checkSize();
  //     window.addEventListener("resize", checkSize);
  //     return () => window.removeEventListener("resize", checkSize);
  //   }, []);

  //   // Close sidebar when switching from mobile to desktop
  //   useEffect(() => {
  //     if (!isMobile) setSidebarOpen(false);
  //   }, [isMobile]);

  return (
    <TooltipProvider>
      <UIProvider>
        {/* Header outside the main content area */}

        {/* Main content with padding-top for the fixed header */}
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