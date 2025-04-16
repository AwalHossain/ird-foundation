"use client"
import Image from 'next/image';
import { useState } from 'react';

interface CategoryIconProps {
  iconPath: string;
  altText: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function CategoryIcon({
  iconPath,
  altText,
  className = 'h-10 w-10 object-contain',
  width = 40,
  height = 40
}: CategoryIconProps) {
  const [error, setError] = useState(false);
  const defaultIcon = '/default-icon.svg';

  // Function to handle image errors
  const handleError = () => {
    console.warn(`Failed to load image: ${iconPath}`);
    setError(true);
  };

  // If no icon path provided or there was an error, use the default
  if (!iconPath || error) {
    return (
      <Image
        alt={altText}
        src={defaultIcon}
        className={className}
        width={width}
        height={height}
      />
    );
  }

  // For database icon paths (referenced in SQLite), check if we need to prepend
  // the "/images/" path or not
  let finalIconPath = iconPath;

  // If it's not a full URL and doesn't start with a slash and doesn't already include /images/
  if (!iconPath.startsWith('http') && !iconPath.startsWith('/') && !iconPath.includes('/images/')) {
    finalIconPath = `/images/${iconPath}`;
  }

  return (
    <Image
      src={finalIconPath}
      alt={altText}
      className={className}
      width={width}
      height={height}
      onError={handleError}
    />
  );
} 