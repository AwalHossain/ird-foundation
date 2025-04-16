import CategoryIcon from '@/components/CategoryIcon';
import type { Category } from '@/lib/api';
import { fetchCategories } from '@/lib/api';
import Link from 'next/link';

// This page uses Static Site Generation (SSG)
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default async function DuaCategoriesPage() {
  // Fetch categories from SQLite backend
  const categories = await fetchCategories();
  console.log(categories, "checking categories");

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Dua Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link 
      href={`/dua-categories/${category.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6 flex items-center">
        <div className="mr-4 bg-gray-100 p-3 rounded-full">
          <CategoryIcon 
            iconPath={category.cat_icon}
            altText={category.cat_name_en}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{category.cat_name_en}</h2>
          <p className="text-gray-600 mt-1">
            Subcategories: {category.no_of_subcat} | Duas: {category.no_of_dua}
          </p>
        </div>
      </div>
    </Link>
  );
} 