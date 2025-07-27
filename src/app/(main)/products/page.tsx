
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGrid } from "@/components/sections/product-grid";
import { ProductFilterSidebar } from '@/components/sections/product-filter-sidebar';
import { getCategories, filterProducts, getProductByProdCode } from "@/services/api";
import type { Product, ApiCategory, ApiProduct } from "@/types";
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from '@/hooks/use-debounce';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const productTypeCode = searchParams.get('productTypeCode')
  const categoryCode = searchParams.get('productTypeCode')
  const initialCategory =categoryCode || productTypeCode || 'all';
  const isMounted = useRef(false)
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
          filterProducts({ categoryTypeCode: selectedCategory, productName: searchTerm }),
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
    const categoryFromUrl = categoryCode || productTypeCode|| 'all';
    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const applyFilters = async () => {
      setIsLoading(true);
      try {
        let productsData:ApiProduct[] =[]
        if(productTypeCode && !isMounted.current){
         productsData= await getProductByProdCode(productTypeCode)
        }else{
         productsData= await filterProducts({ categoryTypeCode: selectedCategory ==="all"?"":selectedCategory, productName: debouncedSearchTerm })
        }
        isMounted.current= true
        setFilteredProducts(productsData)
        setAllProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setIsLoading(false);
      }
    }
      applyFilters();
  }, [debouncedSearchTerm,selectedCategory]);

  // local search
    useEffect(() => {
    const applyFilters = () => {
      if (isLoading) return;
      let productsToFilter = allProducts || [];

      productsToFilter = productsToFilter.filter(product => {
        return isSale ?  product.isSale : true;
      });
      
      setFilteredProducts(productsToFilter);
    };
    applyFilters();
  }, [ isSale]);

  const categoryOptions = useMemo(() => {
    const options = [{ value: 'all', label: 'Tất cả danh mục' }];
    categories.forEach(cat => {
      options.push({ value: cat.categoryCode, label: cat.categoryName });
      cat.listCategoryType.forEach(catType => {
        options.push({ value: catType.categoryTypeCode, label: `- ${catType.categoryTypeName}` });
        // catType.listProductType.forEach(ele=>{
        // options.push({ value: ele.productTypeCode, label: `-- ${ele.productTypeName}` });
        // })
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
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            productCount={filteredProducts?.length || 0}
          />
          <div>
            {filteredProducts && filteredProducts.length > 0 ? (
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
