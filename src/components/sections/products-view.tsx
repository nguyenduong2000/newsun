
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGrid } from "@/components/sections/product-grid";
import { ProductFilterSidebar } from '@/components/sections/product-filter-sidebar';
import { getCategories, filterProducts, getProductByProdCode } from "@/services/api";
import type { ApiCategory, ApiProduct } from "@/types";
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from '@/hooks/use-debounce';

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

export function ProductsView() {
  const searchParams = useSearchParams();
  const productTypeCode = searchParams.get('productTypeCode');
  const categoryCode = searchParams.get('category');
  const initialCategory = categoryCode || productTypeCode || 'all';
  const isMounted = useRef(false);
  
  const [filteredProducts, setFilteredProducts] = useState<ApiProduct[]>([]);
  const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000]);
  const [isSale, setIsSale] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          filterProducts({ categoryTypeCode: selectedCategory === "all" ? "" : selectedCategory, productName: searchTerm }),
          getCategories()
        ]);
        setFilteredProducts(productsData);
        setAllProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const categoryFromUrl = categoryCode || productTypeCode || 'all';
    setSelectedCategory(categoryFromUrl);
  }, [searchParams, categoryCode, productTypeCode]);

  useEffect(() => {
    const applyFilters = async () => {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }
      setIsLoading(true);
      try {
        let productsData: ApiProduct[] = [];
        if (productTypeCode && !isMounted.current) {
            productsData = await getProductByProdCode(productTypeCode);
        } else {
            productsData = await filterProducts({ categoryTypeCode: selectedCategory === "all" ? "" : selectedCategory, productName: debouncedSearchTerm });
        }
        setFilteredProducts(productsData);
        setAllProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch filtered data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    applyFilters();
  }, [debouncedSearchTerm, selectedCategory, productTypeCode]);

  // local search for isSale
  useEffect(() => {
    const applySaleFilter = () => {
      if (isLoading || !isMounted.current) return;
      let productsToFilter = [...allProducts];

      productsToFilter = productsToFilter.filter(product => {
        return isSale ? product.isSale : true;
      });
      
      setFilteredProducts(productsToFilter);
    };
    applySaleFilter();
  }, [isSale, allProducts, isLoading]);

  const categoryOptions = useMemo(() => {
    const options = [{ value: 'all', label: 'Tất cả danh mục' }];
    categories.forEach(cat => {
      options.push({ value: cat.categoryCode, label: cat.categoryName });
      cat.listCategoryType.forEach(catType => {
        options.push({ value: catType.categoryTypeCode, label: `- ${catType.categoryTypeName}` });
      });
    });
    return options;
  }, [categories]);

  if (isLoading && !isMounted.current) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
      <ProductFilterSidebar
        categoryOptions={categoryOptions}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        isSale={isSale}
        onSaleChange={setIsSale}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        productCount={filteredProducts?.length || 0}
      />
      <div>
        {isLoading ? <LoadingSkeleton /> : (
            <>
                {filteredProducts && filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
                ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-muted-foreground">Không tìm thấy sản phẩm nào phù hợp.</p>
                </div>
                )}
            </>
        )}
      </div>
    </div>
  );
}
