import type { SubCategory } from '@/lib/api';
import { fetchCategories, fetchSubcategories } from '@/lib/api';
import Link from 'next/link';

// This page uses Static Site Generation (SSG)
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = await fetchCategories();
  
  return categories.map((category) => ({
    categoryId: category.id.toString(),
  }));
}

export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
  const categoryId = parseInt(params.categoryId);
  
  // Fetch categories to get the current category name
  const categories = await fetchCategories();
  const currentCategory = categories.find(cat => cat.id === categoryId);
  
  // Fetch subcategories for this category
  const subcategories = await fetchSubcategories(categoryId);
  
  if (!currentCategory) {
    return <div>Category not found</div>;
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/dua-categories" className="text-blue-600 hover:underline">
          ← Back to Categories
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8 text-center">
        {currentCategory.cat_name_en}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subcategories.map((subcategory) => (
          <SubcategoryCard 
            key={subcategory.id} 
            subcategory={subcategory} 
            categoryId={categoryId} 
          />
        ))}
      </div>
    </div>
  );
}

function SubcategoryCard({ 
  subcategory, 
  categoryId 
}: { 
  subcategory: SubCategory; 
  categoryId: number 
}) {
  return (
    <Link 
      href={`/dua-categories/${categoryId}/subcategory/${subcategory.id}`}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {subcategory.subcat_name_en}
      </h2>
      <p className="text-gray-600 mt-2">
        Duas: {subcategory.no_of_dua}
      </p>
    </Link>
  );
} 