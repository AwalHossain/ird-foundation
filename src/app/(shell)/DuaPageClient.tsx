/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CategoriesDrawerContainer from "@/components/dua/CategoriesDrawerContainer";
import { CategoryList } from "@/components/dua/CategoryList";
import { SettingsPanel } from "@/components/dua/SettingsPanel";
import PageContainer from "@/components/layout/PageContainer";
import type { Category as ApiCategory, Dua, SubCategory } from "@/lib/api";
import { fetchDuasByCategory, fetchDuasByCategoryAndSubcategory } from "@/lib/api";
import { useEffect, useState } from "react";
import { DuaContent } from "./DuaContent";

interface DuaPageClientProps {
  categories: {
    id: number;
    icon: string;
    title: string;
    subcategories: number;
    duas: number;
    isSelected?: boolean;
    subItems?: string[];
    subItemIds?: number[];
  }[];
  initialCategoryId: number;
  apiCategories: ApiCategory[];
  allSubcategories: Record<number, SubCategory[]>;
}

// Type for the cached dua content
type DuaCache = Record<string, {
  duas: Dua[];
  loading: boolean;
  error: string | null;
}>;

export default function DuaPageClient({
  categories,
  initialCategoryId,
  apiCategories,
  allSubcategories
}: DuaPageClientProps) {
  // State for tracking selected category and subcategory
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(initialCategoryId);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null);

  // Cache for loaded duas to prevent unnecessary refetching
  const [duaCache, setDuaCache] = useState<DuaCache>({});

  // Handle subcategory selection
  const handleSubcategorySelect = (categoryId: number, subcategoryId: number) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubcategoryId(subcategoryId);
  };

  // Prefetch inicial category data
  useEffect(() => {
    // Prefetch function
    const prefetchDuas = async (categoryId: number, subcategoryId: number | null) => {
      const cacheKey = subcategoryId ? `${categoryId}-${subcategoryId}` : `${categoryId}`;

      // Skip if already cached
      if (duaCache[cacheKey]) return;

      // Add loading state to cache
      setDuaCache(prev => ({
        ...prev,
        [cacheKey]: { duas: [], loading: true, error: null }
      }));

      try {
        // Fetch data based on whether we have a subcategory
        const fetchedDuas = subcategoryId
          ? await fetchDuasByCategoryAndSubcategory(categoryId, subcategoryId)
          : await fetchDuasByCategory(categoryId);

        // Store in cache
        setDuaCache(prev => ({
          ...prev,
          [cacheKey]: {
            duas: fetchedDuas.slice(0, 10), // Limit to 10 for performance
            loading: false,
            error: null
          }
        }));
      } catch (err) {
        console.error("Error prefetching duas:", err);
        setDuaCache(prev => ({
          ...prev,
          [cacheKey]: {
            duas: [],
            loading: false,
            error: "Failed to load duas"
          }
        }));
      }
    };

    // Prefetch initial category
    prefetchDuas(initialCategoryId, null);

    // Prefetch first subcategory of each category
    categories.forEach(category => {
      if (category.subItemIds && category.subItemIds.length > 0) {
        const firstSubcategoryId = category.subItemIds[0];
        prefetchDuas(category.id, firstSubcategoryId);
      }
    });
  }, []);

  // Categories component that can be reused in both the main layout and the drawer
  const categoriesComponent = (
    <CategoryList
      categories={categories}
      onSubcategorySelect={handleSubcategorySelect}
    />
  );

  return (
    <div className="">
      {/* Categories Drawer for mobile/tablet */}
      <CategoriesDrawerContainer>
        {categoriesComponent}
      </CategoriesDrawerContainer>

      <PageContainer
        leftColumn={categoriesComponent}
        mainContent={
          <DuaContent
            key={`${selectedCategoryId}-${selectedSubcategoryId}`}
            categoryId={selectedCategoryId}
            subcategoryId={selectedSubcategoryId}
            apiCategories={apiCategories}
            allSubcategories={allSubcategories}
            cachedContent={duaCache}
            onCacheUpdate={(key, data) => {
              setDuaCache(prev => ({
                ...prev,
                [key]: data
              }));
            }}
          />
        }
        rightColumn={
          <div className="rounded-4xl shadow-sm p-5 w-full h-full bg-white">
            <h2 className="text-custom-gray-dark text-xl font-bold font-poppins text-center mb-6">
              Settings
            </h2>
            <SettingsPanel />
          </div>
        }
      />
    </div>
  );
} 