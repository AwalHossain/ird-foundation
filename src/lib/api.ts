// API client for connecting to the SQLite backend

// Types based on SQLite database schema
export interface Category {
  id: number;
  cat_name_en: string;
  cat_name_bn: string;
  cat_icon: string;
  no_of_subcat: number;
  no_of_dua: number;
}

export interface SubCategory {
  id: number;
  cat_id: number;
  subcat_name_en: string;
  subcat_name_bn: string;
  no_of_dua: number;
}

export interface Dua {
  id: number;
  cat_id: number;
  subcat_id: number;
  dua_name_en: string;
  dua_name_bn: string;
  top_en: string;
  top_bn: string;
  dua_arabic: string;
  dua_indopak: string;
  clean_arabic: string;
  transliteration_en: string;
  transliteration_bn: string;
  translation_en: string;
  translation_bn: string;
  bottom_en: string;
  bottom_bn: string;
  refference_en: string;
  refference_bn: string;
  audio: string;
}

// API base URL - change this to your backend URL when deploying
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Fetch all dua categories
 */
export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const categories = await response.json() as Category[];
  
  // Format the image paths by adding proper prefix
  return categories.map((category: Category) => ({
    ...category,
    cat_icon: formatImagePath(category.cat_icon)
  }));
}

/**
 * Fetch subcategories for a specific category
 */
export async function fetchSubcategories(categoryId: number): Promise<SubCategory[]> {
  const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/subcategories`);
  if (!response.ok) {
    throw new Error(`Failed to fetch subcategories for category ${categoryId}`);
  }
  return response.json();
}

/**
 * Fetch duas for a specific subcategory
 */
export async function fetchDuas(subcategoryId: number): Promise<Dua[]> {
  const response = await fetch(`${API_BASE_URL}/subcategories/${subcategoryId}/duas`);
  if (!response.ok) {
    throw new Error(`Failed to fetch duas for subcategory ${subcategoryId}`);
  }
  return response.json();
}

/**
 * Fetch details for a specific dua
 */
export async function fetchDua(duaId: number): Promise<Dua> {
  const response = await fetch(`${API_BASE_URL}/duas/${duaId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch dua ${duaId}`);
  }
  return response.json();
}

/**
 * Get database information (tables)
 * Mainly for debugging purposes
 */
export async function fetchDatabaseInfo(): Promise<{tables: {name: string}[]}> {
  const response = await fetch(`${API_BASE_URL}/db-info`);
  if (!response.ok) {
    throw new Error('Failed to fetch database information');
  }
  return response.json();
}

/**
 * Formats an image path to be compatible with Next.js Image component
 */
function formatImagePath(path: string): string {
  // If path is null or undefined, return a default icon
  if (!path) {
    return '/default-icon.png';
  }
  
  // If it's already a URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Just return the filename/path as-is - our API route will handle it
  return path;
}

/**
 * Fetch duas for a specific category
 */
export async function fetchDuasByCategory(categoryId: number): Promise<Dua[]> {
  const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/duas`);
  if (!response.ok) {
    throw new Error(`Failed to fetch duas for category ${categoryId}`);
  }
  return response.json();
}

/**
 * Fetch duas by both category ID and subcategory ID
 */
export async function fetchDuasByCategoryAndSubcategory(
  categoryId: number, 
  subCategoryId: number
): Promise<Dua[]> {
  const response = await fetch(
    `${API_BASE_URL}/categories/${categoryId}/subcategories/${subCategoryId}/duas`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch duas for category ${categoryId} and subcategory ${subCategoryId}`
    );
  }
  return response.json();
} 