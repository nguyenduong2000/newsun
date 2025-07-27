
import { Suspense } from 'react';
import { ProductsView } from '@/components/sections/products-view';
import { Skeleton } from '@/components/ui/skeleton';

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
);


export default function ProductsPage() {
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
            <Suspense fallback={<LoadingSkeleton />}>
                <ProductsView />
            </Suspense>
        </div>
    );
}
