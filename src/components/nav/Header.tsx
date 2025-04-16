import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUI } from "@/contexts/UIContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchBar } from "../dua/SearchBar";
import SettingsDrawer from "../dua/SettingsDrawer";
import { Button } from "../ui/button";
// Keeping the interface for backward compatibility

const Header = () => {
  // Use our context hook
  const { toggleCategoriesDrawer } = useUI();

  // State for header visibility
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Header height for the placeholder
  const headerHeight = 64;

  // Handle scroll events
  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 20) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };
    window.addEventListener('scroll', controlHeader);
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);
  return (
    <div className={`sticky top-0 left-0 z-50 right-0 w-full p-4 border-b bg-white transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex w-full items-center justify-between gap-4">

        <div className="flex items-center gap-2">
          {/* mobile menu - opens categories drawer */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleCategoriesDrawer}
              className="rounded-full bg-gray-200"
            >
              <Menu size={20} className="text-green-400" />
            </Button>
          </div>
          <div className="cursor-pointer">
            <h1 className="text-lg lg:text-xl font-poppins text-custom-gray-dark font-bold whitespace-nowrap">
              Dua <span className="text-green-300"> & </span> Ruqyah
            </h1>
            <span className="hidden lg:block text-xs font-normal text-gray-500">Hisnul Muslim</span>
          </div>

        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-1 max-w-md mr-52 xl:mr-64">
            <SearchBar placeholder="Search by Dua Name" />
          </div>

          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden p-2 rounded-full bg-gray-200"
                >
                  <Search size={22} className="text-green-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-black p-1.5 rounded-md mt-1.5">
                <p>Search</p>
              </TooltipContent>
            </Tooltip>

            <SettingsDrawer className="xl:hidden bg-gray-200" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="w-9 h-9 lg:w-10 lg:h-10 cursor-pointer hover:ring-1 hover:ring-offset-1 lg:hover:ring-2 lg:hover:ring-offset-2 hover:ring-green-300">
                  <AvatarImage className="rounded-full" src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-black p-1.5 rounded-md mt-1.5">
                <p>Profile</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Header;
