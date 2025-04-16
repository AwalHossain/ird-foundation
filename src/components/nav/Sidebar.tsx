import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

// Import manually created SVG components
import BookmarkIcon from "../icon/BookmarkIcon";
import BooksIcon from "../icon/BooksIcon";
import DonateIcon from "../icon/DonateIcon";
import DuaInfoIcon from "../icon/DuaInfoIcon";
import HomeIcon from "../icon/HomeIcon";
import MemorizeIcon from "../icon/MemorizeIcon";
import MenuIcon from "../icon/MenuIcon";
import RuqyahIcon from "../icon/RuqyahIcon";


const Sidebar = () => {
  return (
    // Default: fixed bottom bar for mobile
    // md+: vertical sidebarx for desktop
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full flex-row
     items-center justify-around border-t border-gray-200 bg-white px-2 shadow-inner
       lg:h-full lg:w-[100px] lg:flex-col lg:justify-between lg:rounded-3xl lg:border-none lg:py-2
       lg:shadow-none">

      {/* Top Logo: Hidden on mobile, visible on md+ */}
      <div className="hidden p-2 lg:flex lg:items-center lg:justify-center">
        <Image src="/assets/hand.png" alt="Logo" width={73} height={73} />
      </div>

      {/* Navigation Icons */}
      {/* Default: flex-row for mobile */}
      {/* md+: flex-col for desktop */}
      <nav className="flex flex-row items-center gap-2  xs:gap-2 sm:gap-4 md:gap-8 lg:flex-col lg:gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 lg:p-3">
              <HomeIcon className="w-6 h-6 lg:w-5 lg:h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-black lg:side-right">
            <p className="text-sm">Home</p>
          </TooltipContent>
        </Tooltip>

        {/* Repeat Tooltip structure for other icons, adjusting side prop */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 lg:p-3">
              <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-black lg:side-right">
            <p className="text-sm">Categories</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 lg:p-3">
              <MemorizeIcon className="w-6 h-6 lg:w-5 lg:h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-black lg:side-right">
            <p className="text-sm">Memorize</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 lg:p-3">
              <BookmarkIcon className="w-6 h-6 lg:w-5 lg:h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-black lg:side-right">
            <p className="text-sm">Bookmark</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 lg:p-3">
              <RuqyahIcon className="w-6 h-6 lg:w-5 lg:h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-black lg:side-right">
            <p className="text-sm">Ruqyah</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 lg:p-3">
              <DuaInfoIcon className="w-6 h-6 lg:w-5 lg:h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-black lg:side-right">
            <p className="text-sm">Dua Info</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 lg:p-3">
              <BooksIcon className="w-6 h-6 lg:w-5 lg:h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-black lg:side-right">
            <p className="text-sm">Learn</p>
          </TooltipContent>
        </Tooltip>

      </nav>

      {/* Bottom Logo: Hidden on mobile, visible on md+ */}
      {/* Added flex-shrink-0 to prevent shrinking in flex row on mobile if needed */}
      <div className="hidden lg:block flex-shrink-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="bg-green-500 p-4 rounded-xl flex items-center justify-center text-white cursor-pointer hover:bg-green-600">
              <DonateIcon className="w-5 h-5" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-black lg:side-right">
            <p className="text-sm">Donate</p>
          </TooltipContent>
        </Tooltip>
      </div>

    </div>
  );
};

export default Sidebar; 