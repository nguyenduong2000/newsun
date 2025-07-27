


export interface Product {
  id: string;
  typeCode: string;
  typeName: string;
  categoryId: string;
  productName: string;
  slug: string;
  productCode: string;
  pathMainImage: string;
  images: string[];
  rawPrice: number;
  salePrice: number;
  starRating: number;
  quantity: number;
  purchaseCount: number;
  isSale: boolean;
  description: string;
  specs: { name: string; value: string }[];
  reviews?: number;
  featuresImage?: string;
  models?: string[];
  sections?: ApiProductSection[];
}


export interface CartItem extends Omit<ApiProduct, 'salePrice'> {
  quantity: number;
  price: number;
}


// Old category structure, will be replaced by API DTO based structures
export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  parentId: string | null;
  level: number;
}

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

// This will be the main navigation structure for the mega menu
export interface MegaMenuCategory {
  title: string;
  href: string;
  children?: MegaMenuCategory[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface Banner {
  pathImage: string;
  bannerCode: string;
}


// --- New API DTO based types ---

export interface ApiProductProperty {
  name: string;
  value: string;
}

export interface ApiProductSection {
  id: string;
  title: string;
  displayOrder: number;
  description: string;
  pathImage: string;
  positionImage: string;
}

export interface ApiProduct {
  id: string;
  typeCode: string;
  typeName: string;
  productName: string;
  pathMainImage: string;
  productCode: string;
  rawPrice: number;
  salePrice: number;
  starRating: number;
  quantity: number;
  purchaseCount: number;
  isSale: boolean;
  listProductSection: ApiProductSection[];
  lisProductSubImage: { id: string; pathImage: string }[];
  listProductProperties: ApiProductProperty[];
}

export interface ApiProductType {
  id: string;
  categoryTypeCode: string;
  categoryTypeName: string;
  description?: string; // Made optional as it's not in the DTO
  listProduct: ApiProduct[];
}

export interface ApiCategoryType {
  id: string;
  categoryTypeCode: string;
  categoryTypeName: string;
  listProductType: ApiProductCategory[];
}

export interface ApiCategory {
  id: string;
  categoryCode: string;
  categoryName: string;
  description: string;
  listCategoryType: ApiCategoryType[];
}
export interface ApiProductCategory {
  productTypeName: string;
  productTypeCode: string;
}

export interface ApiResponse<T> {
  data: T;
  meta: {
    code: string;
    page: number;
    size: number;
    total: number;
    totalErrors: number;
    message: string;
  };
}
export interface ApiResponseAction {
  meta: {
    code: string;
    message: string;
  };
}
export interface Consultations  {
    fullName: string;
    phoneNumber: string;
    productCode: string;
    productName: string;
    content: string;
}
