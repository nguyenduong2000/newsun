
'use server';

import axios from '@/lib/axios';
import type { Product, Banner, ApiCategory, ApiProduct, ApiResponse, ApiProductType, ApiResponseAction } from '@/types';
import { apiProducts, apiCategories, heroBanners as allMockBanners } from '@/lib/mock-data';
import { API_ENDPOINTS } from '@/config/endpoints';

export const getProducts = async (searchKey?: string): Promise<ApiProductType[]> => {
  try {
    const apiResponse = await axios.get<ApiProductType[]>(API_ENDPOINTS.GET_PRODUCTS, {
        params: { search: searchKey }
    });
    return apiResponse.data;
  } catch (error) {
  
    return [];
  }
};

export const filterProducts = async (body:{productName?:string,categoryTypeCode?:string}): Promise<ApiProduct[]> => {
  try {
    const apiResponse = await axios.post<ApiProduct[]>(API_ENDPOINTS.SEARCH_PRODUCTS, 
        body
    );
    return apiResponse.data;
  } catch (error) {
  
    return [];
  }
};

export const getProductByProdCode = async (productTypeCode?:string): Promise<ApiProduct[]> => {
  try {
    const apiResponse = await axios.get<ApiProduct[]>(API_ENDPOINTS.GET_PRODUCTS_BY_PROD_CODE(productTypeCode) );
    return apiResponse.data;
  } catch (error) {
  
    return [];
  }
};

export const getDealProducts = async (searchKey?: string): Promise<ApiProduct[]> => {
  try {
    const apiResponse = await axios.get<ApiProduct[]>(API_ENDPOINTS.GET_PRODUCT_PROMOTION);
    return apiResponse.data;
  } catch (error) {
  
    return [];
  }
};

export const getProductBySlug = async (slug: string): Promise<ApiProduct | undefined> => {
    try {
    const apiResponse = await axios.get<ApiProduct>(API_ENDPOINTS.GET_PRODUCT_DETAIL(slug));
    return apiResponse.data;
    } catch(error) {
        console.error(`Failed to fetch product by slug ${slug}:`, error);
        return undefined;
    }
}
export const getProductModelBySlug = async (slug: string): Promise<ApiProduct[] | undefined> => {
    try {
    const apiResponse = await axios.get<ApiProduct[]>(API_ENDPOINTS.GET_PRODUCTS_TYPE_CODE(slug));
    return apiResponse.data;
    } catch(error) {
        console.error(`Failed to fetch product by slug ${slug}:`, error);
        return undefined;
    }
}

export const getCategories = async (): Promise<ApiCategory[]> => {
  try {
    const categories = await axios.get<ApiCategory[]>(API_ENDPOINTS.GET_CATEGORIES);
    return categories.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return apiCategories;
  }
};

export const getBanners = async (): Promise<Banner[]> => {
    try {
        const banners = await axios.get<Banner[]>(API_ENDPOINTS.GET_BANNERS);
        return banners.data;
    } catch (error) {
        console.error("Failed to fetch banners:", error);
        return allMockBanners;
    }
}

// order
export const sendConsultations = async (body:{productName?:string,categoryTypeCode?:string}): Promise<ApiResponseAction | null> => {
  try {
    const apiResponse = await axios.post<ApiResponseAction>(API_ENDPOINTS.SEND_CONSULTATIONS, 
        body
    );
    return apiResponse.data;
  } catch (error) {
  
    return null
  }
};

export const sendOrder = async (body:any): Promise<ApiResponseAction | null> => {
  try {
    const apiResponse = await axios.post<ApiResponseAction>(API_ENDPOINTS.ORDER, 
        body
    );
    return apiResponse.data;
  } catch (error) {
  
    return null
  }
};

