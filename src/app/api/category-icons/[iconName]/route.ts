import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

// This is a fallback icon if the real one can't be found
const DEFAULT_ICON = '/default-icon.png';

export async function GET(
  request: Request,
  { params }: { params: { iconName: string } }
) {
  const iconName = params.iconName;
  
  // Try to find the icon in the public/images directory
  const iconPath = path.join(process.cwd(), 'public', 'images', iconName);
  
  try {
    // Check if the file exists
    await fs.promises.access(iconPath);
    
    // If it exists, redirect to the public path
    return NextResponse.redirect(new URL(`/images/${iconName}`, request.url));
  } catch (error) {
    // If the file doesn't exist, we'll provide a default icon URL
    console.warn(`Icon not found: ${iconName}, using default icon instead`);
    return NextResponse.redirect(new URL(DEFAULT_ICON, request.url));
  }
} 