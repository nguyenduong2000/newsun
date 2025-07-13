
import { ProductGrid } from "@/components/sections/product-grid";
import { products } from "@/lib/mock-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description: "Khám phá tất cả các sản phẩm điện máy công nghiệp và thiết bị bếp chất lượng cao từ Newsun.",
};

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
      <ProductGrid products={products} />
    </div>
  );
}
