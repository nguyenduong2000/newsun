
'use server';

import axios from '@/lib/axios';
import type { Product, Banner, ApiCategory, ApiProduct, ApiResponse } from '@/types';
import { apiProducts, apiCategories, heroBanners as allMockBanners } from '@/lib/mock-data';
import { API_ENDPOINTS } from '@/config/endpoints';

const createSlug = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {
    return {
        id: apiProduct.id,
        productName: apiProduct.productName,
        slug: createSlug(apiProduct.productName),
        typeCode: apiProduct.typeCode,
        typeName: apiProduct.typeName,
        categoryId: apiProduct.typeCode, // Or map to a specific category if needed
        pathMainImage: apiProduct.pathMainImage,
        images: apiProduct.lisProductSubImage ? [apiProduct.pathMainImage, ...apiProduct.lisProductSubImage.map(img => img.pathImage)] : [apiProduct.pathMainImage],
        productCode: apiProduct.productCode,
        rawPrice: apiProduct.rawPrice,
        salePrice: apiProduct.salePrice,
        starRating: apiProduct.starRating,
        quantity: apiProduct.quantity,
        purchaseCount: apiProduct.purchaseCount,
        isSale: apiProduct.isSale,
        description: apiProduct.listProductSection?.[0]?.description || 'Mô tả chi tiết sản phẩm đang được cập nhật.',
        specs: apiProduct.listProductProperties || [],
        reviews: Math.floor(Math.random() * 100), // Mocking reviews
        featuresImage: apiProduct.pathMainImage, 
        sections: apiProduct.listProductSection || []
    }
}


export const getProducts = async (searchKey?: string): Promise<Product[]> => {
  try {
    console.log(`API call: getProducts with searchKey: "${searchKey || ''}"`);
    // NOTE: This now makes a real API call.
    const apiResponse = await axios.get<ApiProduct[]>(API_ENDPOINTS.GET_PRODUCTS, {
        params: { search: searchKey }
    });

    const allProducts: Product[] = apiResponse.map(p => mapApiProductToProduct(p));
    return allProducts;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    console.log("Falling back to mock product data.");
    let mockProducts: Product[] = [];
    apiProducts.forEach(catType => {
        catType.listProduct.forEach(apiProd => {
            mockProducts.push(mapApiProductToProduct(apiProd));
        });
    });
     if (searchKey) {
      mockProducts = mockProducts.filter(p => p.productName.toLowerCase().includes(searchKey.toLowerCase()));
    }
    return mockProducts;
  }
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
    try {
        console.log(`API call: getProductBySlug with slug: ${slug}`);
        // This is a simulation. In a real app, you'd likely fetch by slug/code from the API.
        const allProducts = await getProducts();
        const product = allProducts.find(p => p.slug === slug);
        
        if (product) {
            // If you need to fetch full details not present in the list view:
            // const detailedProductData = await axios.get<ApiProduct>(API_ENDPOINTS.GET_PRODUCT_DETAIL(product.productCode));
            // return mapApiProductToProduct(detailedProductData);
            return product; // Returning the found product for now
        }
        return undefined;

    } catch(error) {
        console.error(`Failed to fetch product by slug ${slug}:`, error);
        return undefined;
    }
}

export const getCategories = async (): Promise<ApiCategory[]> => {
  try {
    console.log('API call: getCategories');
    const categories = await axios.get<ApiCategory[]>(API_ENDPOINTS.GET_CATEGORIES);
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    console.log("Falling back to mock category data.");
    return apiCategories;
  }
};

export const getBanners = async (): Promise<Banner[]> => {
    try {
        console.log('API call: getBanners');
        const banners = await axios.get<Banner[]>(API_ENDPOINTS.GET_BANNERS);
        return banners;
    } catch (error) {
        console.error("Failed to fetch banners:", error);
        console.log("Falling back to mock banner data.");
        return allMockBanners;
    }
}
