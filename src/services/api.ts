
'use server';

import axios from '@/lib/axios';
import type { Product, Banner, ApiCategory, ApiProduct, ApiProductType, ApiProductSection } from '@/types';
import { apiProducts, apiCategories, heroBanners as allMockBanners } from '@/lib/mock-data';

const MOCK_API_DELAY = 100; // ms

const createSlug = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

const mapApiProductToProduct = (apiProduct: ApiProduct, categoryTypeCode: string, categoryTypeName: string): Product => {
    return {
        id: apiProduct.id,
        productName: apiProduct.productName,
        slug: createSlug(apiProduct.productName),
        typeCode: categoryTypeCode,
        typeName: categoryTypeName,
        categoryId: categoryTypeCode, // Or map to a specific category if needed
        pathMainImage: apiProduct.pathMainImage,
        images: apiProduct.lisProductSubImage.map(img => img.pathImage),
        productCode: apiProduct.productCode,
        rawPrice: apiProduct.rawPrice,
        salePrice: apiProduct.salePrice,
        starRating: apiProduct.starRating,
        quantity: apiProduct.quantity,
        purchaseCount: apiProduct.purchaseCount,
        isSale: apiProduct.isSale,
        description: apiProduct.listProductSection?.[0]?.description || 'Mô tả chi tiết sản phẩm đang được cập nhật.', // Example mapping
        specs: (apiProduct.listProductProperties || []).reduce((acc, prop) => {
            acc[prop.name] = prop.value;
            return acc;
        }, {} as Record<string, string>),
        reviews: Math.floor(Math.random() * 100), // Mocking reviews
        featuresImage: apiProduct.pathMainImage, // Example mapping
        sections: apiProduct.listProductSection || []
    }
}


export const getProducts = async (searchKey?: string): Promise<Product[]> => {
  try {
    console.log(`API call: getProducts with searchKey: "${searchKey || ''}"`);
    await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));

    const apiResponse: { data: ApiProductType[] } = {
        data: apiProducts
    };

    let allProducts: Product[] = [];
    apiResponse.data.forEach(catType => {
        catType.listProduct.forEach(apiProd => {
            allProducts.push(mapApiProductToProduct(apiProd, catType.categoryTypeCode, catType.categoryTypeName));
        });
    });

    if (searchKey) {
      allProducts = allProducts.filter(p => p.productName.toLowerCase().includes(searchKey.toLowerCase()));
    }

    return allProducts;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
    try {
        console.log(`API call: getProductBySlug with slug: ${slug}`);
        const allProducts = await getProducts();
        return allProducts.find(p => p.slug === slug);
    } catch(error) {
        console.error(`Failed to fetch product by slug ${slug}:`, error);
        return undefined;
    }
}

export const getCategories = async (): Promise<ApiCategory[]> => {
  try {
    console.log('API call: getCategories');
    await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
    return apiCategories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

export const getBanners = async (): Promise<Banner[]> => {
    try {
        console.log('API call: getBanners');
        await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
        return allMockBanners;
    } catch (error) {
        console.error("Failed to fetch banners:", error);
        return [];
    }
}
