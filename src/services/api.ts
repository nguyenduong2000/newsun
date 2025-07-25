

'use server';

import axios from '@/lib/axios';
import type { Product, Category, Banner, ApiCategory, ApiResponse } from '@/types';

// In a real application, you would replace these mock API calls
// with actual requests to your backend. The mock data is returned
// for demonstration purposes.
import { products, apiCategories } from '@/lib/mock-data';

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

// This function now returns a flattened list of products from the new API structure
export const getProducts = async (): Promise<Product[]> => {
  console.log('API call: getProducts');
  // In a real app, you might fetch all grouped products and flatten them.
  // const response = await axios.get('/api/products-grouped'); 
  // const groupedData = response.data;
  // const allProducts = groupedData.flatMap(group => group.listProduct.map(p => mapApiProductToProduct(p)));
  // return allProducts;
  
  await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
  return products; // Returning the already mapped mock data for now
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
    console.log(`API call: getProductBySlug with slug: ${slug}`);
    // This would also need to fetch all products and then find by slug.
    await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
    return products.find(p => p.slug === slug);
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
