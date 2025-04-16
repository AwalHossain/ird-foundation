import React from "react";

interface PageContainerProps {
  leftColumn: React.ReactNode;
  mainContent: React.ReactNode;
  rightColumn: React.ReactNode;
}

/**
 * PageContainer - A three-column layout container for the main Dua page
 * 
 * Features:
 * - Responsive grid layout (stack on mobile, side-by-side on larger screens)
 * - Fixed width for all columns (not expanding with screen size)
 * - Centered layout with max-width constraint
 * - Sticky positioning for left and right columns
 * - Proper scrolling behavior
 */
export default function PageContainer({
  leftColumn,
  mainContent,
  rightColumn,
}: PageContainerProps) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)_280px] gap-8 w-full">
        {/* Left column - Categories */}
        <div className="sticky top-5 h-[calc(100vh-72px)] overflow-y-auto custom-scrollbar lg:block hidden pb-0">
          {leftColumn}
        </div>

        {/* Middle column - Main content */}
        <div className="min-w-0">
          {mainContent}
        </div>

        {/* Right column - Settings */}
        <div className="sticky top-5 h-[calc(100vh-22px)] overflow-y-auto custom-scrollbar hidden xl:block pb-20">
          {rightColumn}
        </div>
      </div>
    </div>
  );
} 