export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  images: string[];
  specs: Record<string, string>;
  rating?: number;
  reviews?: number;
  sold?: number;
  featuresImage?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
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
