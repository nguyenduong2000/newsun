/**
 * @fileoverview Centralized API endpoint definitions.
 */

export const API_ENDPOINTS = Object.freeze({
  // Products
  GET_PRODUCTS: "/product", // [get] Lấy danh sách sản phẩm
  SEARCH_PRODUCTS: "/product/search",  // [post] Tìm kiếm sản phẩm
  GET_PRODUCT_DETAIL: (code: string) => `/product/${code}`, // [get] Lấy chi tiết sản phẩm theo code
  GET_PRODUCT_PROMOTION: "/product/promotion", // [get] Lấy sản phẩm khuyến mại
  GET_PRODUCTS_BY_TYPE_CODE: (code: string) => `/product/find-by-product-type-code/${code}`, // [get] Lấy sản phẩm theo code loại
  
  // Categories
  GET_CATEGORIES: "/category",
  
  // Banners
  GET_BANNERS: "/banner",
});
