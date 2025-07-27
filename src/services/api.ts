

'use server';

import axios from '@/lib/axios';
import type { Product, Banner, ApiCategory, ApiProduct, ApiResponse, ApiProductType, ApiResponseAction, Consultations } from '@/types';
import { apiProducts, apiCategories, heroBanners as allMockBanners } from '@/lib/mock-data';
import { API_ENDPOINTS } from '@/config/endpoints';

export const getProducts = async (searchKey?: string): Promise<ApiProductType[]> => {
  try {
    const apiResponse = await axios.get<ApiProductType[]>(API_ENDPOINTS.GET_PRODUCTS_IN_HOME, {
        params: { search: searchKey }
    });
    return apiResponse as any;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

export const filterProducts = async (body:{productName?:string,categoryTypeCode?:string}): Promise<ApiProduct[]> => {
  try {
    const apiResponse = await axios.post<ApiProduct[]>(API_ENDPOINTS.SEARCH_PRODUCTS, 
        body
    );
    return apiResponse as any;
  } catch (error) {
    console.error("Failed to filter products:", error);
    return [];
  }
};

export const getProductByProdCode = async (productTypeCode?:string): Promise<ApiProduct[]> => {
  try {
    const apiResponse = await axios.get<ApiProduct[]>(API_ENDPOINTS.GET_PRODUCTS_BY_PROD_CODE(productTypeCode) );
    return apiResponse as any;
  } catch (error) {
    console.error("Failed to get product by product code:", error);
    return [];
  }
};

export const getDealProducts = async (searchKey?: string): Promise<ApiProduct[]> => {
  try {
    const apiResponse = await axios.get<ApiProduct[]>(API_ENDPOINTS.GET_PRODUCT_PROMOTION);
    return apiResponse as any;
  } catch (error) {
    console.error("Failed to fetch deal products:", error);
    return [];
  }
};

export const getProductBySlug = async (slug: string): Promise<ApiProduct | undefined> => {
    try {
    const apiResponse = await axios.get<ApiProduct>(API_ENDPOINTS.GET_PRODUCT_DETAIL(slug));
    return apiResponse as any;
    } catch(error) {
        console.error(`Failed to fetch product by slug ${slug}:`, error);
        return undefined;
    }
}
export const getProductModelBySlug = async (slug: string): Promise<ApiProduct[] | undefined> => {
    try {
    const apiResponse = await axios.get<ApiProduct[]>(API_ENDPOINTS.GET_PRODUCTS_TYPE_CODE(slug));
    return apiResponse as any;
    } catch(error) {
        console.error(`Failed to fetch product by slug ${slug}:`, error);
        return undefined;
    }
}

export const getCategories = async (): Promise<ApiCategory[]> => {
  try {
    const categories = await axios.get<ApiCategory[]>(API_ENDPOINTS.GET_CATEGORY);
    return categories as any;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

export const getBanners = async (): Promise<Banner[]> => {
    try {
        const banners = await axios.get<Banner[]>(API_ENDPOINTS.GET_BANNER);
        return banners as any;
    } catch (error) {
        console.error("Failed to fetch banners:", error);
        return [];
    }
}

export const sendConsultations = async (body:Consultations): Promise<ApiResponseAction | null> => {
  try {
    const apiResponse = await axios.post<ApiResponseAction>(API_ENDPOINTS.SEND_CONSULTATIONS, 
        body
    );
    return apiResponse as any;
  } catch (error) {
  
    return null
  }
};

export const sendOrder = async (body:any): Promise<ApiResponseAction | null> => {
  try {
    const apiResponse = await axios.post<ApiResponseAction>(API_ENDPOINTS.ORDER, 
        body
    );
    return apiResponse as any;
  } catch (error) {
  
    return null
  }
};

