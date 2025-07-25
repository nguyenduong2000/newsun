/**
 * @fileoverview Centralized API endpoint definitions.
 */

export const API_ENDPOINTS = {
  // Banners
  GET_BANNERS: '/banners',

  // Categories
  GET_CATEGORIES: '/product-categories',

  // Products
  GET_PRODUCTS: '/products', // Base endpoint for products, can be filtered with params
  GET_PRODUCT_BY_SLUG: (slug: string) => `/products/${slug}`, // Example of a dynamic endpoint
};
