"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

interface Category {
  id: number;
  icon: string;
  title: string;
  subcategories: number;
  duas: number;
  isSelected?: boolean;
  subItems?: string[];
  subItemIds?: number[];
}

interface CategoryListProps {
  categories: Category[];
  onSubcategorySelect: (categoryId: number, subcategoryId: number) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onSubcategorySelect
}) => {
  // State for tracking selected category
  const [selectedCategoryID, setSelectedCategoryID] = useState<number | null>(
    // Set initial selected category if one is marked as selected
    categories.find(cat => cat.isSelected)?.id || null
  );

  // Keep track of selected subcategory for each category
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<number, number>>({});

  // Set default selected subcategory for the initially selected category
  useEffect(() => {
    if (selectedCategoryID) {
      const category = categories.find(cat => cat.id === selectedCategoryID);
      if (category?.subItemIds && category.subItemIds.length > 0) {
        // Use the first subcategory as default if none is selected
        if (!selectedSubcategories[selectedCategoryID]) {
          const firstSubcategoryId = category.subItemIds[0];
          setSelectedSubcategories(prev => ({
            ...prev,
            [selectedCategoryID]: firstSubcategoryId
          }));

          // Trigger the selection
          onSubcategorySelect(selectedCategoryID, firstSubcategoryId);
        }
      }
    }
  }, [selectedCategoryID, categories, selectedSubcategories, onSubcategorySelect]);

  const handleCategoryClick = (id: number) => {
    // If clicking the already selected category, don't deselect it
    if (selectedCategoryID !== id) {
      setSelectedCategoryID(id);

      // If this category has a previously selected subcategory, select it
      if (selectedSubcategories[id]) {
        onSubcategorySelect(id, selectedSubcategories[id]);
      } else {
        // Otherwise select the first subcategory if available
        const category = categories.find(cat => cat.id === id);
        if (category?.subItemIds && category.subItemIds.length > 0) {
          const firstSubcategoryId = category.subItemIds[0];
          setSelectedSubcategories(prev => ({
            ...prev,
            [id]: firstSubcategoryId
          }));
          onSubcategorySelect(id, firstSubcategoryId);
        } else {
          // No subcategories available, just select the category
          onSubcategorySelect(id, 0);
        }
      }
    }
  }

  const handleSubcategoryClick = (categoryId: number, subcategoryId: number, event: React.MouseEvent) => {
    event.preventDefault();

    // Update the selected subcategory for this category
    setSelectedSubcategories(prev => ({
      ...prev,
      [categoryId]: subcategoryId
    }));

    onSubcategorySelect(categoryId, subcategoryId);
  };

  return (
    <div className="bg-white border w-full pb-[15px] rounded-[10px] border-[rgba(226,226,226,1)] border-solid">
      <div className="w-full">
        <div className="self-stretch bg-[rgba(31,164,91,1)] w-full gap-2.5 overflow-hidden text-[17px] text-white font-semibold whitespace-nowrap text-center px-[124px] py-[18px] rounded-[10px_10px_0px_0px]">
          Categories
        </div>

        <div className="w-full text-base text-[rgba(134,134,134,1)] font-normal mt-[15px] px-[15px] mb-[15px]">
          {/* searchbar */}
          <div className="bg-white border self-stretch s flex min-w-60 items-center overflow-hidden justify-between my-auto pl-4 pr-1 py-1 rounded-[10px] border-[rgba(226,226,226,1)] border-solid">
            <Image
              alt="Search Icon"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/73b40388b76200207056aba077553f871fa825ee?placeholderIfAbsent=true"
              width={24}
              height={24}
              className="object-contain"
            />
            <Input
              type="text"
              placeholder="Search by Categories"
              className="self-stretch min-w-60 text-base text-[rgba(134,134,134,1)] font-normal flex-1
          shrink basis-auto my-auto outline-none bg-transparent mr-2
          border-none
          focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
      </div>

      <div className="w-full px-[15px]">
        {categories.map((category, index) => (
          <div key={index}>
            {selectedCategoryID === category.id ? (
              <div className="bg-[rgba(232,240,245,1)] flex w-full items-center gap-4 p-2.5 rounded-[10px] cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="bg-[var(--color-custom-greenish)] self-stretch flex items-center justify-center gap-2.5 w-[60px] h-[60px] my-auto p-2.5 rounded-[10px]">
                  <Image
                    src="/assets/fever.png"
                    alt={category.title}
                    width={60}
                    height={60}
                  />
                </div>
                <div className="self-stretch flex-1 shrink basis-5 my-auto">
                  <div className="text-[rgba(31,164,91,1)] text-base font-semibold">
                    {category.title}
                  </div>
                  <div className="text-[rgba(126,126,126,1)] text-sm font-normal mt-[5px]">
                    Subcategory: {category.subcategories}
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-center whitespace-nowrap justify-center my-auto">
                  <div className="text-[rgba(57,57,57,1)] text-base font-semibold">
                    {category.duas}
                  </div>
                  <div className="text-[rgba(126,126,126,1)] text-sm font-normal mt-[5px]">
                    Duas
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full items-center gap-4 p-2.5 rounded-[5px] border-[rgba(249,249,249,1)] border-b cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="bg-[rgba(232,240,245,1)] self-stretch flex items-center justify-center gap-2.5 w-[60px] h-[60px] my-auto p-2.5 rounded-[10px]">
                  {/* <CategoryIcon
                    iconPath={category.icon}
                    altText={category.title}
                    width={40}
                    height={40}
                    className="aspect-[1] object-contain w-10"
                  /> */}
                  <Image
                    src="/assets/fever.png"
                    alt={category.title}
                    width={60}
                    height={60}
                  />
                </div>
                <div className="self-stretch flex-1 shrink basis-5 my-auto">
                  <div className="text-[rgba(57,57,57,1)] text-base font-semibold">
                    {category.title}
                  </div>
                  <div className="text-[rgba(126,126,126,1)] text-sm font-normal mt-[5px]">
                    Subcategory: {category.subcategories}
                  </div>
                </div>
                <div className="border self-stretch w-0 shrink-0 h-[60px] border-[rgba(226,226,226,1)] border-solid" />
                <div className="self-stretch flex flex-col items-center whitespace-nowrap justify-center my-auto">
                  <div className="text-[rgba(57,57,57,1)] text-base font-semibold">
                    {category.duas}
                  </div>
                  <div className="text-[rgba(126,126,126,1)] text-sm font-normal mt-[5px]">
                    Duas
                  </div>
                </div>
              </div>
            )}

            {selectedCategoryID === category.id && category.subItems && (
              <div className="flex w-full gap-[19px] mt-1 pl-5">
                <div className="min-w-60 pl-4 text-base text-[rgba(55,55,55,1)] font-medium leading-loose w-[314px]">
                  {category.subItems.map((item, idx) => {
                    const subcategoryId = category.subItemIds?.[idx] || idx + 1;
                    // Check if this subcategory is selected
                    const isSelected = selectedSubcategories[category.id] === subcategoryId;

                    return (
                      <div
                        key={idx}
                        onClick={(e) => handleSubcategoryClick(category.id, subcategoryId, e)}
                        className={`
                          relative pb-4 py-3 flex-1 shrink basis-[0%] w-full leading-tight block cursor-pointer
                          before:content-[''] before:absolute before:left-[-14px] before:top-0 before:bottom-[-16px] before:w-px before:border-l-[2px] before:border-dotted before:border-custom-green
                          after:content-[''] after:absolute after:left-[-16px] after:top-[18px] after:w-2 after:h-2 after:bg-custom-green after:rounded-full
                          hover:text-custom-green transition-colors
                          ${isSelected ? "text-custom-green font-semibold" : "text-gray-700"}
                        `}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
