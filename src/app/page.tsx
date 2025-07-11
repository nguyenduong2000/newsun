import { HeroSection } from "@/components/sections/hero-section";
import { ProductGrid } from "@/components/sections/product-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products, categories } from "@/lib/mock-data";
import { ArrowRight, Newspaper, Flame, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { DealProductCard } from "@/components/deal-product-card";


export default function Home() {
  const featuredProducts = products.slice(0, 8);
  const featuredCategories = categories.slice(0, 4);
  const dealProducts = products.slice(0, 5);

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      <HeroSection />

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredCategories.map((category) => (
             <Link href={`/products?category=${category.slug}`} key={category.id}>
              <Card className="text-center p-4 hover:shadow-lg transition-shadow duration-300 h-full flex items-center group bg-white rounded-xl shadow-md overflow-hidden hover:scale-105">
                 <div className="flex-shrink-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                    data-ai-hint="kitchen appliance"
                  />
                 </div>
                 <div className="ml-4">
                  <h3 className="font-semibold text-base text-gray-800 group-hover:text-primary">{category.name}</h3>
                 </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary text-primary-foreground p-4">
          <h2 className="text-2xl font-headline font-bold flex items-center">
            <Flame className="mr-2 h-6 w-6"/>
            Săn deal giá hời giao hàng tận nơi
          </h2>
        </div>
        <div className="p-6">
           <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {dealProducts.map((product, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <DealProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2 hidden sm:flex" />
              <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 hidden sm:flex" />
            </Carousel>
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
