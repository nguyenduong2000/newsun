
'use server';

import axios from '@/lib/axios';
import type { Product, Banner, ApiCategory, ApiProduct, ApiProductType } from '@/types';
import { products as allMockProducts, apiCategories, heroBanners as allMockBanners } from '@/lib/mock-data';

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
        reviews: Math.floor(Math.random() * 100),
        featuresImage: apiProduct.pathMainImage,
    }
}

export const getProducts = async (searchKey?: string): Promise<Product[]> => {
  try {
    console.log(`API call: getProducts with searchKey: "${searchKey || ''}"`);
    await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));

    // In a real scenario, you'd pass the searchKey to the API
    // const response = await axios.get('/products', { params: { q: searchKey } });
    // For now, we mock filtering
    let products = allMockProducts;

    if (searchKey) {
      products = products.filter(p => p.productName.toLowerCase().includes(searchKey.toLowerCase()));
    }
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return []; // Return an empty array on error
  }
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
    try {
        console.log(`API call: getProductBySlug with slug: ${slug}`);
        // We're fetching all and then filtering, which is inefficient.
        // A real API would have an endpoint like /products/{slug}
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
    // const response = await axios.get('/categories');
    // return response.data;
    return apiCategories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return []; // Return an empty array on error
  }
};

export const getBanners = async (): Promise<Banner[]> => {
    try {
        console.log('API call: getBanners');
        await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
        // const response = await axios.get('/banners');
        // return response.data;
        return allMockBanners;
    } catch (error) {
        console.error("Failed to fetch banners:", error);
        return []; // Return an empty array on error
    }
}
