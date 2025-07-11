
"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { products } from "@/lib/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { ProductGrid } from "@/components/sections/product-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, ShieldCheck, Truck } from "lucide-react";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  const [selectedImage, setSelectedImage] = useState(product?.image || "https://placehold.co/600x600.png");
  const [selectedModel, setSelectedModel] = useState(product?.models?.[1] || null);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };
  const displayPrice = product.price > 0 ? `${formatPrice(product.price)}đ` : "Liên Hệ";

  return (
    <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div>
          <div className="aspect-square relative w-full border rounded-lg overflow-hidden mb-4">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              data-ai-hint="kitchen appliance"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`aspect-square relative w-full border rounded-md overflow-hidden cursor-pointer hover:border-primary ${selectedImage === img ? 'border-primary border-2' : ''}`}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="20vw"
                   data-ai-hint="kitchen appliance"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Product Info */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-headline font-bold mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
             <span className="text-3xl font-bold text-primary">{displayPrice}</span>
             {product.originalPrice && product.price > 0 && (
                <span className="text-muted-foreground line-through text-lg">
                    {formatPrice(product.originalPrice)}đ
                </span>
            )}
          </div>

          {product.models && (
             <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-2">Bạn đang chọn: <span className="font-bold text-foreground">{selectedModel}</span></div>
                <div className="flex flex-wrap gap-2">
                    {product.models.map(model => (
                        <Button key={model} variant={selectedModel === model ? 'default': 'outline'} size="sm" onClick={() => setSelectedModel(model)}>
                            {model}
                        </Button>
                    ))}
                </div>
                 <p className="text-xs text-muted-foreground mt-1">Tổng cộng có {product.models.length} model cho bạn lựa chọn</p>
            </div>
          )}

          <div className="border-t border-b py-4 mb-6">
             <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-bold text-lg text-primary mb-2 flex items-center"><Gift className="mr-2"/>Khuyến mãi tại Newsun</h3>
                <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                    <li>Tặng ngay 1 phiếu mua hàng trị giá 500.000 VNĐ.</li>
                    <li>Giảm giá 20% khi mua kèm phụ kiện.</li>
                    <li>Miễn phí vận chuyển toàn quốc.</li>
                </ul>
            </div>
          </div>
          
          <Button size="lg" className="w-full text-lg h-14 font-bold">TƯ VẤN MIỄN PHÍ</Button>
          <div className="grid grid-cols-3 gap-4 text-center mt-4 text-sm">
            <div className="flex flex-col items-center">
                <Truck className="w-8 h-8 text-primary mb-1"/>
                <span>Giao hàng toàn quốc</span>
            </div>
            <div className="flex flex-col items-center">
                <ShieldCheck className="w-8 h-8 text-primary mb-1"/>
                <span>Bảo hành 12 tháng</span>
            </div>
             <div className="flex flex-col items-center">
                <Gift className="w-8 h-8 text-primary mb-1"/>
                <span>Nhiều quà tặng</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detailed Description Section */}
      <div className="mt-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column: Main Content */}
            <div className="lg:col-span-2">
               <h2 className="text-3xl lg:text-4xl font-headline font-bold mb-6">Mô tả sản phẩm</h2>
               <article className="prose prose-lg max-w-none">
                    <p>{product.description}</p>
                     <figure>
                        <Image
                            src="https://placehold.co/800x450.png"
                            alt={`Hình ảnh mô tả ${product.name}`}
                            width={800}
                            height={450}
                            className="rounded-lg shadow-md"
                            data-ai-hint="product feature"
                        />
                        <figcaption className="text-center italic text-sm mt-2">
                            Lò quay gà vịt bằng than 80 – Thơm ngon, sạch sẽ, năng suất
                        </figcaption>
                    </figure>

                    <h2>Review chi tiết lò quay gà vịt bằng than 80 NEWSUN</h2>
                    <p>
                        Để giúp bạn có cái nhìn khách quan hơn về sản phẩm, NEWSUN sẽ review chi tiết các đặc điểm, tính năng nổi bật của lò quay gà vịt bằng than 80 ngay sau đây:
                    </p>
                    <h3>Thiết kế tối ưu, chất liệu cao cấp</h3>
                    <p>
                        Lò quay gà vịt bằng than 80 được thiết kế tối ưu với các bộ phận có thể tháo rời, giúp việc di chuyển và vệ sinh trở nên dễ dàng hơn. Toàn bộ lò được làm từ inox cao cấp, chống gỉ sét, đảm bảo an toàn vệ sinh thực phẩm và có độ bền cao.
                    </p>
               </article>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="border rounded-lg bg-card">
                  <h2 className="text-xl font-headline font-bold p-4 bg-muted/50 rounded-t-lg">
                    Thông số kỹ thuật
                  </h2>
                  <div className="p-4">
                    <Table className="specs-table">
                      <TableBody>
                        {Object.entries(product.specs).map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell className="font-semibold">{key}</TableCell>
                            <TableCell>{value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                   <div className="p-4 border-t">
                      <Button variant="outline" className="w-full">Bài viết hướng dẫn</Button>
                   </div>
                </div>
              </div>
            </div>
        </div>
      </div>


      <div className="mt-16">
        <h2 className="text-2xl md:text-3xl font-headline font-bold mb-6">Sản phẩm liên quan</h2>
        <ProductGrid products={relatedProducts} />
      </div>

    </div>
  );
}

