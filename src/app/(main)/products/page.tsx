
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGrid } from "@/components/sections/product-grid";
import { ProductFilterSidebar } from '@/components/sections/product-filter-sidebar';
import { getProducts, getCategories } from "@/services/api";
import type { Product, ApiCategory } from "@/types";
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000]);
  const [isSale, setIsSale] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    // Update category from URL search params
    const categoryFromUrl = searchParams.get('category') || 'all';
    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = selectedCategory === 'all' || product.typeCode === selectedCategory;
      const priceMatch = product.salePrice >= priceRange[0] && product.salePrice <= priceRange[1];
      const saleMatch = !isSale || product.isSale === isSale;
      return categoryMatch && priceMatch && saleMatch;
    });
  }, [products, selectedCategory, priceRange, isSale]);

  const categoryOptions = useMemo(() => {
    const options = [{ value: 'all', label: 'Tất cả danh mục' }];
    categories.forEach(cat => {
      cat.listCategoryType.forEach(catType => {
        options.push({ value: catType.categoryTypeCode, label: catType.categoryTypeName });
      });
    });
    return options;
  }, [categories]);

  const LoadingSkeleton = () => (
     <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        <div>
          <Skeleton className="h-[400px] w-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[350px] w-full" />
            ))}
        </div>
    </div>
  )

  return (
    <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Tất cả sản phẩm
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Duyệt qua danh mục đa dạng của chúng tôi để tìm giải pháp hoàn hảo cho
          nhu cầu kinh doanh của bạn.
        </p>
      </div>
      
      {isLoading ? <LoadingSkeleton /> : (
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
            <ProductFilterSidebar
                categoryOptions={categoryOptions}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                isSale={isSale}
                onSaleChange={setIsSale}
                productCount={filteredProducts.length}
            />
            <div>
                {filteredProducts.length > 0 ? (
                    <ProductGrid products={filteredProducts} />
                ) : (
                    <div className="text-center py-16">
                        <p className="text-xl text-muted-foreground">Không tìm thấy sản phẩm nào phù hợp.</p>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
}
