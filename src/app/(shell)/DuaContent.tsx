"use client";

import { DuaCard } from "@/components/dua/DuaCard";
import {
  fetchDuasByCategory,
  fetchDuasByCategoryAndSubcategory,
  type Category,
  type Dua,
  type SubCategory
} from "@/lib/api";
import { useEffect, useRef, useState } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <div className="bg-white border flex w-full items-center gap-2.5 text-base flex-wrap px-4 py-3 md:px-[30px] md:py-[15px] rounded-[10px] border-gray-200 border-solid mb-4">
    <div className="text-green-700 font-semibold leading-loose self-stretch my-auto">
      Section:
    </div>
    <div className="text-gray-700 font-medium self-stretch my-auto">
      {title}
      {subtitle && (
        <span className="text-gray-500 ml-2">({subtitle})</span>
      )}
    </div>
  </div>
);

// Type for the cached dua content
type DuaCache = Record<string, {
  duas: Dua[];
  loading: boolean;
  error: string | null;
}>;

interface DuaContentProps {
  categoryId: number;
  subcategoryId: number | null;
  apiCategories: Category[];
  allSubcategories: Record<number, SubCategory[]>;
  cachedContent?: DuaCache;
  onCacheUpdate?: (key: string, data: { duas: Dua[]; loading: boolean; error: string | null }) => void;
}

export function DuaContent({
  categoryId,
  subcategoryId,
  apiCategories,
  allSubcategories,
  cachedContent = {},
  onCacheUpdate
}: DuaContentProps) {
  // Get the cache key
  const cacheKey = subcategoryId ? `${categoryId}-${subcategoryId}` : `${categoryId}`;

  // Initialize state from cache if available
  const cachedData = cachedContent[cacheKey];
  const [duas, setDuas] = useState<Dua[]>(cachedData?.duas || []);
  const [loading, setLoading] = useState(cachedData ? cachedData.loading : true);
  const [error, setError] = useState<string | null>(cachedData?.error || null);

  const contentRef = useRef<HTMLDivElement>(null);
  // Add a ref to track which keys we've already fetched for
  const fetchedKeysRef = useRef<Set<string>>(new Set());

  // Fetch duas when category or subcategory changes (if not in cache)
  useEffect(() => {
    // Reset loading state when cache key changes
    if (!fetchedKeysRef.current.has(cacheKey)) {
      setLoading(true);
    }

    // If we have cached data and it's either loaded or errored, don't fetch again
    if (cachedContent[cacheKey] && !cachedContent[cacheKey].loading) {
      setDuas(cachedContent[cacheKey].duas);
      setLoading(false);
      setError(cachedContent[cacheKey].error);
      return;
    }

    // If we've already tried to fetch this key and it's marked as fetched, don't fetch again
    if (fetchedKeysRef.current.has(cacheKey)) {
      return;
    }

    async function fetchDuas() {
      try {
        setLoading(true);
        setError(null);

        // Mark this key as having been fetched
        fetchedKeysRef.current.add(cacheKey);

        // Update cache to show loading
        if (onCacheUpdate) {
          onCacheUpdate(cacheKey, { duas: [], loading: true, error: null });
        }

        let fetchedDuas: Dua[];

        // If subcategory is selected, fetch duas for that specific subcategory
        if (subcategoryId) {
          fetchedDuas = await fetchDuasByCategoryAndSubcategory(categoryId, subcategoryId);
        } else {
          // Otherwise fetch duas for the category
          fetchedDuas = await fetchDuasByCategory(categoryId);
        }

        // Limit to 10 duas for better performance
        const limitedDuas = fetchedDuas.slice(0, 10);
        setDuas(limitedDuas);

        // Update cache with fetched data
        if (onCacheUpdate) {
          onCacheUpdate(cacheKey, {
            duas: limitedDuas,
            loading: false,
            error: null
          });
        }
      } catch (err) {
        console.error("Error fetching duas:", err);
        const errorMsg = "Failed to load duas. Please try again.";
        setError(errorMsg);
        setDuas([]);

        // Update cache with error
        if (onCacheUpdate) {
          onCacheUpdate(cacheKey, {
            duas: [],
            loading: false,
            error: errorMsg
          });
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDuas();
  }, [categoryId, subcategoryId, cacheKey, onCacheUpdate, cachedContent]);

  // Scroll to top when category or subcategory changes
  useEffect(() => {
    if (contentRef.current) {
      // Find the closest scrollable parent container
      const scrollToTop = () => {
        // Only scroll if we're already scrolled down a bit (more than 100px)
        const shouldScroll = window.scrollY > 100;

        if (shouldScroll) {
          // Try scrolling the main document
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

          // Also try to scroll any parent scrollable containers
          let parent = contentRef.current?.parentElement;
          while (parent) {
            if (parent.scrollHeight > parent.clientHeight && parent.scrollTop > 100) {
              parent.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }
            parent = parent.parentElement;
          }

          // Also scroll the element itself if it exists
          if (contentRef.current) {
            contentRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      };

      // Execute scroll with a small delay to ensure DOM is updated
      setTimeout(scrollToTop, 100);
    }
  }, [categoryId, subcategoryId]);

  // Get category and subcategory info
  const category = apiCategories.find(cat => cat.id === categoryId);
  const subcategory = subcategoryId
    ? allSubcategories[categoryId]?.find(sub => sub.id === subcategoryId)
    : null;

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="w-full" ref={contentRef}>
      <SectionHeader
        title={category.cat_name_en}
        subtitle={subcategory?.subcat_name_en}
      />

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading duas...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          {error}
        </div>
      ) : duas.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No duas found for this {subcategoryId ? 'subcategory' : 'category'}.
        </div>
      ) : (
        duas.map((dua, index) => (
          <DuaCard
            key={`${dua.id}-${index}`}
            number={index + 1}
            title={dua.dua_name_en || `Dua #${index + 1}`}
            content={dua.top_en || ""}
            arabicText={dua.dua_arabic || ""}
            transliteration={dua.transliteration_en || ""}
            translation={dua.translation_en || ""}
            reference={dua.refference_en || ""}
            audio={dua.audio || ""}
          />
        ))
      )}
    </div>
  );
} 