// src/app/(shell)/layout.tsx
"use client";

import Header from "@/components/nav/Header";
import Sidebar from "@/components/nav/Sidebar";

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
  
  const toggleSidebar = () => false;
  
  return (
    <div className="flex min-h-screen">
      {/* Desktop-only sidebar spacer - hidden on mobile */}
      <div className="hidden lg:block w-[100px] shrink-0">
        {/* Empty div to reserve space for the fixed sidebar */}
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6 md:pl-4 pb-20 lg:pb-4">
          {children}
        </main>
      </div>
      
      {/* Sidebar is positioned by its own component styles */}
      <Sidebar />
    </div>
  );
}