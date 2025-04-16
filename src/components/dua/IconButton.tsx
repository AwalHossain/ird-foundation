import Image from "next/image";
import React from "react";

interface IconButtonProps {
  src: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  src,
  alt = "",
  className = "",
  onClick,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={`aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto cursor-pointer ${className}`}
      onClick={onClick}
      width={24}
      height={24}
    />
  );
};
