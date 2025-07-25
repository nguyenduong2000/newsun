
import type { ApiCategory, ApiCategoryType, ApiProductType, ApiProduct, MegaMenuCategory } from '@/types';

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
          href: `/products?categoryType=${catType.categoryTypeCode}`,
          children: catType.listProductType?.map((prodType: ApiProductType) => {
            return {
              title: prodType.productTypeName,
              href: `/products?productType=${prodType.productTypeCode}`,
              children: prodType.listProduct?.map((prod: ApiProduct) => {
                const productSlug = createSlug(prod.productName);
                return {
                  title: prod.productName,
                  href: `/products/${productSlug}`,
                  children: []
                }
              })
            };
          })
        };
      })
    };
  });
}
