import { DuaCard } from '@/components/dua/DuaCard';
import { fetchCategories, fetchDuasByCategoryAndSubcategory, fetchSubcategories } from '@/lib/api';
import Link from 'next/link';

// This page uses Static Site Generation (SSG)
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Generate static paths for all category/subcategory combinations
export async function generateStaticParams() {
  const categories = await fetchCategories();
  
  const paths = [];
  
  for (const category of categories) {
    const subcategories = await fetchSubcategories(category.id);
    
    for (const subcategory of subcategories) {
      paths.push({
        categoryId: category.id.toString(),
        subCategoryId: subcategory.id.toString(),
      });
    }
  }
  
  return paths;
}

export default async function SubcategoryPage({ 
  params 
}: { 
  params: { 
    categoryId: string; 
    subCategoryId: string;
  } 
}) {
  const categoryId = parseInt(params.categoryId);
  const subCategoryId = parseInt(params.subCategoryId);
  
  // Fetch categories and subcategories to get names
  const categories = await fetchCategories();
  const subcategories = await fetchSubcategories(categoryId);
  
  const currentCategory = categories.find(cat => cat.id === categoryId);
  const currentSubcategory = subcategories.find(sub => sub.id === subCategoryId);
  
  // Fetch duas for this subcategory
  const duas = await fetchDuasByCategoryAndSubcategory(categoryId, subCategoryId);
  
  if (!currentCategory || !currentSubcategory) {
    return <div>Category or subcategory not found</div>;
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link 
          href={`/dua-categories/${categoryId}`} 
          className="text-blue-600 hover:underline"
        >
          ← Back to {currentCategory.cat_name_en}
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-2 text-center">
        {currentSubcategory.subcat_name_en}
      </h1>
      <p className="text-center text-gray-600 mb-8">
        {currentCategory.cat_name_en}
      </p>
      
      <div className="space-y-6">
        {duas.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No duas found for this subcategory.
          </div>
        ) : (
          duas.map((dua, index) => (
            <DuaCard
              key={dua.id}
              number={index + 1}
              title={dua.dua_name_en}
              content={dua.top_en}
              arabicText={dua.dua_arabic}
              transliteration={dua.transliteration_en}
              translation={dua.translation_en}
              reference={dua.refference_en}
              audio={dua.audio}
            />
          ))
        )}
      </div>
    </div>
  );
} 