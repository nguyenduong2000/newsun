"use client";

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

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column: Main Content */}
        <div className="lg:col-span-2">
           <h1 className="text-3xl lg:text-4xl font-headline font-bold mb-6">{product.name}</h1>
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

      <div className="mt-16">
        <h2 className="text-2xl md:text-3xl font-headline font-bold mb-6">Sản phẩm liên quan</h2>
        <ProductGrid products={relatedProducts} />
      </div>

    </div>
  );
}
