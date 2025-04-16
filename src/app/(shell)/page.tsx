import {
  fetchCategories,
  fetchSubcategories,
  type SubCategory
} from "@/lib/api";
import DuaPageClient from "./DuaPageClient";

// Use real data from API
export async function generateMetadata() {
  // Fetch categories here to avoid duplicate fetches
  await fetchCategories();
  return {
    title: "Dua & Ruqyah",
  };
}

export default async function Page() {
  // Fetch real categories from the API
  const apiCategories = await fetchCategories();
  
  // Get the first category as default
  const defaultCategoryId = apiCategories[0]?.id || 1;
  
  // Fetch subcategories for all categories and store them
  const allSubcategories: Record<number, SubCategory[]> = {};
  
  for (const category of apiCategories) {
    allSubcategories[category.id] = await fetchSubcategories(category.id);
  }
  
  // Map API data to the format expected by CategoryList component
  const categories = apiCategories.map((category, index) => {
    const subcategories = allSubcategories[category.id] || [];
    
    return {
      id: category.id,
      icon: category.cat_icon,
      title: category.cat_name_en,
      subcategories: category.no_of_subcat,
      duas: category.no_of_dua,
      isSelected: index === 0, // Make the first one selected by default
      subItems: subcategories.map(sub => sub.subcat_name_en),
      subItemIds: subcategories.map(sub => sub.id)
    };
  });

  // Pass all data to the client component
  return (
    <DuaPageClient 
      categories={categories}
      initialCategoryId={defaultCategoryId}
      apiCategories={apiCategories}
      allSubcategories={allSubcategories}
    />
  );
} 