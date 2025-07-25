

'use server';

import axios from '@/lib/axios';
import type { Product, Category, Banner, ApiCategory, ApiResponse, ApiProduct, ApiProductType } from '@/types';

// In a real application, you would replace these mock API calls
// with actual requests to your backend. The mock data is returned
// for demonstration purposes.
import { apiProducts, apiCategories } from '@/lib/mock-data';

const heroBanners: Banner[] = [
  {
    src: "https://dienmaynewsun.com/wp-content/uploads/2025/01/banner-tet-may-vat-long.jpg",
    alt: "Banner 1",
    aiHint: "kitchen equipment",
  },
  {
    src: "https://dienmaynewsun.com/wp-content/uploads/2025/01/banner-tet-may-vat-long.jpg",
    alt: "Banner 2",
    aiHint: "food processing",
  },
  {
    src: "https://dienmaynewsun.com/wp-content/uploads/2025/01/banner-tet-may-vat-long.jpg",
    alt: "Banner 3",
    aiHint: "industrial appliances",
  },
];


const MOCK_API_DELAY = 100; // ms

const createSlug = (text: string): string => {
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
        // These fields might not exist on the new DTO, provide defaults
        reviews: Math.floor(Math.random() * 100),
        featuresImage: apiProduct.pathMainImage,
    }
}

// This function now returns a flattened list of products from the new API structure
export const getProducts = async (): Promise<Product[]> => {
  console.log('API call: getProducts');
  await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
  // In a real app, you might fetch all grouped products and flatten them.
  // const response = await axios.get<ApiResponse<ApiProductType[]>>('/api/v1/products-by-category'); 
  // const groupedData = response.data.data;
  const groupedData = apiProducts;
  
  const allProducts = groupedData.flatMap(group => 
      group.listProduct.map(p => mapApiProductToProduct(p, group.categoryTypeCode, group.categoryTypeName))
  );

  return allProducts;
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
    console.log(`API call: getProductBySlug with slug: ${slug}`);
    // This would also need to fetch all products and then find by slug.
    const allProducts = await getProducts();
    return allProducts.find(p => p.slug === slug);
}

export const getCategories = async (): Promise<ApiCategory[]> => {
  console.log('API call: getCategories');
  // const response = await axios.get<ApiResponse<ApiCategory[]>>('/api/v1/category-types');
  // return response.data.data;
  await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
  return apiCategories;
};

export const getBanners = async (): Promise<Banner[]> => {
    console.log('API call: getBanners');
    // const response = await axios.get('/api/banners');
    // return response.data;
    await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
    return heroBanners;
}

