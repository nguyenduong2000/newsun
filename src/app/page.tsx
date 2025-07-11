import { HeroSection } from "@/components/sections/hero-section";
import { ProductGrid } from "@/components/sections/product-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products, categories } from "@/lib/mock-data";
import { ArrowRight, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const featuredProducts = products.slice(0, 8);
  const featuredCategories = categories.slice(0, 6);

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      <HeroSection />

      <section>
        <h2 className="text-2xl md:text-3xl font-headline font-bold text-center mb-8">
          Danh mục sản phẩm
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredCategories.map((category) => (
            <Link href={`/products?category=${category.slug}`} key={category.id}>
              <Card className="text-center p-4 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col items-center justify-center">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={80}
                  height={80}
                  className="mb-2"
                  data-ai-hint="kitchen appliance"
                />
                <h3 className="font-semibold text-sm">{category.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-headline font-bold">
            Sản phẩm nổi bật
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/products">
              Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-headline font-bold">
            Tin tức & Sự kiện
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/blog">
              Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <Newspaper className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-headline text-lg font-bold mb-2">
                Tư vấn chọn mua nồi nấu phở
              </h3>
              <p className="text-muted-foreground text-sm">
                Những kinh nghiệm xương máu khi chọn mua nồi nấu phở cho người mới
                bắt đầu kinh doanh...
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <Newspaper className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-headline text-lg font-bold mb-2">
                Phân biệt các loại máy xay thịt
              </h3>
              <p className="text-muted-foreground text-sm">
                Trên thị trường có rất nhiều loại máy xay thịt, làm sao để chọn
                được loại phù hợp?
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <Newspaper className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-headline text-lg font-bold mb-2">
                Bí quyết vệ sinh máy ép mía
              </h3>
              <p className="text-muted-foreground text-sm">
                Giữ cho máy ép mía của bạn luôn sạch sẽ và bền bỉ với những mẹo
                đơn giản sau...
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
