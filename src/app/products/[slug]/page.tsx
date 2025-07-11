import { notFound } from "next/navigation";
import Image from "next/image";
import { products } from "@/lib/mock-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart } from "lucide-react";
import type { Metadata } from "next";
import { ProductGrid } from "@/components/sections/product-grid";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }
  
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative bg-card rounded-lg overflow-hidden border">
                    <Image
                      src={img}
                      alt={`${product.name} - ảnh ${index + 1}`}
                      fill
                      className="object-contain"
                      data-ai-hint="kitchen appliance"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-headline font-bold">{product.name}</h1>
          
          <div className="flex items-center space-x-3">
            <Badge>Còn hàng</Badge>
            <span className="text-sm text-muted-foreground">Mã SP: {product.id}</span>
          </div>

          <div className="space-y-2">
            <span className="text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through ml-3">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          
          <div className="flex items-center space-x-4">
            <Button size="lg" className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Thêm vào giỏ
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Mua ngay
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Mô tả chi tiết</TabsTrigger>
            <TabsTrigger value="specs">Thông số kỹ thuật</TabsTrigger>
            <TabsTrigger value="warranty">Chính sách</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6 prose max-w-none">
            <p>{product.description}</p>
            <p>Sản phẩm được làm từ chất liệu cao cấp, đảm bảo độ bền và an toàn cho người sử dụng. Thiết kế thông minh, dễ dàng vận hành và vệ sinh.</p>
          </TabsContent>
          <TabsContent value="specs" className="mt-6">
            <Table>
              <TableBody>
                {Object.entries(product.specs).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="warranty" className="mt-6 prose max-w-none">
            <h3 className="font-headline">Bảo hành</h3>
            <p>Sản phẩm được bảo hành chính hãng trong vòng 12 tháng. Hỗ trợ kỹ thuật 24/7.</p>
            <h3 className="font-headline">Vận chuyển</h3>
            <p>Miễn phí vận chuyển toàn quốc. Giao hàng nhanh chóng từ 2-4 ngày làm việc.</p>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl md:text-3xl font-headline font-bold mb-6">Sản phẩm liên quan</h2>
        <ProductGrid products={relatedProducts} />
      </div>

    </div>
  );
}
