
import type { ApiCategory, ApiCategoryType, ApiProductCategory, ApiProduct, MegaMenuCategory } from '@/types';

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export function mapCategoriesToMegaMenu(apiCategories: ApiCategory[]): MegaMenuCategory[] {
  if (!apiCategories) return [];

  return apiCategories.map((category: ApiCategory) => {
    return {
      title: category.categoryName,
      href: `/products?category=${category.categoryCode}`,
      children: category.listCategoryType?.map((catType: ApiCategoryType) => {
        return {
          title: catType.categoryTypeName,
          href: `/products?category=${catType.categoryTypeCode}`,
          children: catType.listProductType?.map((prodType) => {
            return {
              title: prodType.productTypeName,
              href: `/products?productTypeCode=${prodType.productTypeCode}`,
            
            };
          })
        };
      })
    };
  });
}
