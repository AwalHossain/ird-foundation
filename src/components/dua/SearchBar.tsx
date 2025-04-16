import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";

interface SearchBarProps {
  placeholder: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  className = "",
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="bg-white border self-stretch s flex min-w-60 items-center overflow-hidden justify-between my-auto pl-4 pr-1 py-1 rounded-[10px] border-[rgba(226,226,226,1)] border-solid">
        <Input
          type="text"
          placeholder={placeholder}
          className="self-stretch min-w-60 text-base text-[rgba(134,134,134,1)] font-normal flex-1
          shrink basis-auto my-auto outline-none bg-transparent mr-2
          border-none
          focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="bg-gray-100 self-stretch flex items-center justify-center overflow-hidden px-3.5 py-2.5 rounded-md">
          <Image
            alt="Search Icon"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/73b40388b76200207056aba077553f871fa825ee?placeholderIfAbsent=true"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};
