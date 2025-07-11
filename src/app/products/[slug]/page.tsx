"use client";

import { useState } from "react";
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
import { CheckCircle, Clock, Gift, ShieldCheck, Thermometer, Truck } from "lucide-react";
import { ProductGrid } from "@/components/sections/product-grid";
import { cn } from "@/lib/utils";

const formatPrice = (price: number) => {
  if (price === 0) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedModel, setSelectedModel] = useState(product.models ? product.models[0] : null);

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="py-8">
      <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div className="md:col-span-2">
          <div className="aspect-square relative bg-card rounded-lg overflow-hidden border mb-4">
            <Image
              src={mainImage}
              alt={`${product.name} - ảnh chính`}
              fill
              className="object-contain"
              data-ai-hint="kitchen appliance"
            />
            <div className="absolute top-2 right-2">
                <Image src="https://placehold.co/80x80.png" width={80} height={80} alt="Sản phẩm cao cấp" data-ai-hint="quality seal" />
            </div>
          </div>
          
          <Carousel className="w-full mt-4" opts={{ align: 'start', slidesToScroll: 3 }}>
            <CarouselContent className="-ml-2">
              {product.images.map((img, index) => (
                <CarouselItem key={index} className="pl-2 basis-1/4">
                  <div 
                    className={cn("aspect-square relative bg-card rounded-md overflow-hidden border cursor-pointer", mainImage === img ? "border-primary border-2" : "")}
                    onClick={() => setMainImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - thumbnail ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-[-10px]" />
            <CarouselNext className="right-[-10px]" />
          </Carousel>
        </div>

        {/* Right Column: Product Details */}
        <div className="space-y-6 md:col-span-3">
          <h1 className="text-3xl lg:text-4xl font-headline font-bold">{product.name}</h1>
          
          {product.models && product.models.length > 0 && selectedModel && (
            <div>
              <p className="text-sm mb-2">
                Có <span className="font-bold">{product.models.length} Model</span>. Bạn đang chọn <span className="font-bold text-primary">{selectedModel}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.models.map(model => (
                  <Button 
                    key={model} 
                    variant={selectedModel === model ? "destructive" : "outline"}
                    onClick={() => setSelectedModel(model)}
                  >
                    {model}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="font-bold text-primary text-lg mb-4">Khuyến mãi tại Newsun</h3>
            <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Trả góp 0%</span>
                </li>
                 <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Giảm giá lên đến 30% khi mua hàng tại Điện Máy NEWSUN</span>
                </li>
                 <li className="flex items-start">
                    <Gift className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Tặng kèm phiếu mua hàng trị giá 500.000đ hấp dẫn</span>
                </li>
                 <li className="flex items-start">
                    <Truck className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>MIỄN PHÍ lắp đặt đối với những đơn hàng có bán kính dưới 15km</span>
                </li>
            </ul>
          </div>
          
          <Button size="lg" className="w-full text-lg h-14 font-bold">
            Tư vấn miễn phí
          </Button>
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
