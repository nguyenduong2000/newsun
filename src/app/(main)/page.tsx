
import { HeroSection } from "@/components/sections/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProducts, getCategories, getBanners } from "@/services/api";
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
import { ProductCard } from "@/components/product-card";


export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();
  const banners = await getBanners();

  const featuredProducts = products.slice(0, 8);
  const featuredCategories = categories.slice(0, 4);
  const dealProducts = products.slice(0, 5);

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20 mb-8">
      <HeroSection banners={banners} />

      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12 md:space-y-16 lg:space-y-20">
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-headline font-bold">
              Danh mục sản phẩm
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Link href={`/products?category=${category.slug}`} key={category.id} className="block group">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                            src={category.image}
                            alt={category.name}
                            width={80}
                            height={80}
                            className="object-contain rounded-full bg-gray-100 p-2"
                            data-ai-hint="kitchen appliance"
                          />
                      </div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                          {category.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-primary rounded-lg shadow-lg overflow-hidden border p-6">
          <h2 className="text-2xl font-headline font-bold flex items-center text-primary-foreground mb-4">
            <Flame className="mr-2 h-6 w-6"/>
            Săn deal giá hời giao hàng tận nơi
          </h2>
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
            <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2 hidden sm:flex bg-white/30 hover:bg-white/50 text-white border-none" />
            <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 hidden sm:flex bg-white/30 hover:bg-white/50 text-white border-none" />
          </Carousel>
        </section>

        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl md:text-3xl font-headline font-bold">
              Sản phẩm nổi bật
            </h2>
            <Button variant="ghost" asChild>
              <Link href="/products">
                Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {featuredProducts.map((product, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4 my-5">
                   <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2 hidden sm:flex" />
            <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 hidden sm:flex" />
          </Carousel>
        </section>
        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl md:text-3xl font-headline font-bold">
              Sản phẩm hot
            </h2>
            <Button variant="ghost" asChild>
              <Link href="/products">
                Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {featuredProducts.map((product, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4 my-5">
                   <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2 hidden sm:flex" />
            <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 hidden sm:flex" />
          </Carousel>
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
    </div>
  );
}
