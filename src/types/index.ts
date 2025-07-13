

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
  specs: Record<string, string>;
  reviews?: number;
  featuresImage?: string;
  models?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}


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
