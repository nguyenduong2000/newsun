
'use server';

import axios from '@/lib/axios';
import type { Product, Category, Banner } from '@/types';

// In a real application, you would replace these mock API calls
// with actual requests to your backend. The mock data is returned
// for demonstration purposes.
import { products, categories } from '@/lib/mock-data';

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


const MOCK_API_DELAY = 500; // ms

export const getProducts = async (): Promise<Product[]> => {
  console.log('API call: getProducts');
  // Example of what a real API call would look like:
  // const response = await axios.get('/api/products');
  // return response.data;
  
  // Returning mock data for now
  await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
  return products;
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
    console.log(`API call: getProductBySlug with slug: ${slug}`);
    // const response = await axios.get(`/api/products/${slug}`);
    // return response.data;
    await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
    return products.find(p => p.slug === slug);
}

export const getCategories = async (): Promise<Category[]> => {
  console.log('API call: getCategories');
  // const response = await axios.get('/api/categories');
  // return response.data;
  await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
  return categories;
};

export const getBanners = async (): Promise<Banner[]> => {
    console.log('API call: getBanners');
    // const response = await axios.get('/api/banners');
    // return response.data;
    await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
    return heroBanners;
}
