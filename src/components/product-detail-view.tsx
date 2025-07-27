
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ApiProduct, Product } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { ProductGrid } from "@/components/sections/product-grid";
import { Button } from "@/components/ui/button";
import { Gift, ShieldCheck, Truck, MessageSquare } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { ControlledInput } from "@/components/form/controlled-input";
import { ControlledTextarea } from "@/components/form/controlled-textarea";
import { useToast } from "@/hooks/use-toast";
import { sendConsultations } from "@/services/api";
import { useRouter } from 'next/navigation';

const consultationFormSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự."),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ."),
  content: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự."),
  productCode: z.string(),
  productName: z.string(),
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;

function ConsultationForm({ setOpen, product }: { setOpen: (open: boolean) => void, product: ApiProduct }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      content: "Tôi đang quan tâm đến sản phẩm này, vui lòng tư vấn cho tôi.",
      productCode: product.productCode,
      productName: product.productName,
    },
  });

  async function onSubmit(values: ConsultationFormValues) {
    try {
      setIsSubmitting(true);
      console.log(values);
      await sendConsultations(values)

      toast({
        title: "Gửi yêu cầu thành công!",
        description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
      });

    } catch (error) {

    } finally {
      setIsSubmitting(false);

      setOpen(false);
      form.setValue("fullName", "");
      form.setValue("phoneNumber", "");
      form.setValue("content", "");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">THÔNG TIN LIÊN HỆ</DialogTitle>
          <DialogDescription className="text-center">
            Vui lòng để lại thông tin chúng tôi sẽ liên hệ lại ngay, xin cám ơn!
          </DialogDescription>
        </DialogHeader>
        <ControlledInput
          control={form.control}
          name="fullName"
          placeholder="Họ tên"
          autoComplete="name"
        />
        <ControlledInput
          control={form.control}
          name="phoneNumber"
          placeholder="Số điện thoại"
          autoComplete="tel"
        />
        <ControlledTextarea
          control={form.control}
          name="content"
          placeholder="Nội dung yêu cầu"
          rows={4}
        />
        <DialogFooter className="sm:justify-between sm:gap-4 pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300">
              HUỶ
            </Button>
          </DialogClose>
          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Đang gửi..." : "GỬI"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

interface IProductDetail {
  product: ApiProduct
   relatedProducts: ApiProduct[]
   models: ApiProduct[] | undefined
   slug: string

}

export function ProductDetailView({ product, relatedProducts, models,slug}: IProductDetail) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.pathMainImage);
  const [selectedModel, setSelectedModel] = useState(null);
  const router = useRouter();

  const handleSelectModel = (slug:string)=>{
    router.push(`/products/${slug}`);
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };
  const displayPrice = product.salePrice > 0 ? `${formatPrice(product.salePrice)}đ` : "Liên Hệ";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="aspect-square relative w-full border rounded-lg overflow-hidden mb-4">
            <Image
              src={selectedImage}
              alt={product.productName}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              data-ai-hint="kitchen appliance"
            />
          </div>
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                <CarouselItem className="basis-1/5 pl-2">
                  <div
                    className={`aspect-square relative w-full border rounded-md overflow-hidden cursor-pointer hover:border-primary ${selectedImage === product.pathMainImage ? 'border-primary border-2' : ''}`}
                    onClick={() => setSelectedImage(product.pathMainImage)}
                  >
                    <Image
                      src={product.pathMainImage}
                      alt={`${product.productName} thumbnail path main image`}
                      fill
                      className="object-contain"
                      sizes="20vw"
                      data-ai-hint="kitchen appliance"
                    />
                  </div>
                </CarouselItem>
                {product.lisProductSubImage.map((img, index) => (
                  <CarouselItem key={img.id} className="basis-1/5 pl-2">
                    <div
                      className={`aspect-square relative w-full border rounded-md overflow-hidden cursor-pointer hover:border-primary ${selectedImage === img.pathImage ? 'border-primary border-2' : ''}`}
                      onClick={() => setSelectedImage(img.pathImage)}
                    >
                      <Image
                        src={img.pathImage}
                        alt={`${product.productName} thumbnail ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="20vw"
                        data-ai-hint="kitchen appliance"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-14px] top-1/2 -translate-y-1/2 h-8 w-8" />
              <CarouselNext className="absolute right-[-14px] top-1/2 -translate-y-1/2 h-8 w-8" />
            </Carousel>
          </div>
        </div>

        <div>
          <h1 className="text-3xl lg:text-4xl font-headline font-bold mb-4">{product.productName}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold text-primary">{displayPrice}</span>
            {product.rawPrice > 0 && product.salePrice > 0 && (
              <span className="text-muted-foreground line-through text-lg">
                {formatPrice(product.rawPrice)}đ
              </span>
            )}
          </div>

          {models && models.length > 0 && (
            <div className="mb-6">
              {/* <div className="text-sm text-muted-foreground mb-2">Bạn đang chọn: <span className="font-bold text-foreground">{product.productName}</span></div> */}
              <div className="flex flex-wrap gap-2">
                {models.map((model,index) => (
                  <Button key={index} variant={slug === model.productCode ? 'default' : 'outline'} size="sm" onClick={() => handleSelectModel(model.productCode)}>
                    {model.typeName}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Tổng cộng có {models.length} model cho bạn lựa chọn</p>
            </div>
          )}

          <div className="border-t border-b py-4 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-bold text-lg text-primary mb-2 flex items-center"><Gift className="mr-2" />Khuyến mãi tại maythucpham365</h3>
              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>Tặng ngay 1 phiếu mua hàng trị giá 500.000 VNĐ.</li>
                <li>Giảm giá 20% khi mua kèm phụ kiện.</li>
                <li>Miễn phí vận chuyển toàn quốc.</li>
              </ul>
            </div>
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Button size="lg" className="w-full text-lg h-14 font-bold" onClick={() => setIsModalOpen(true)}>
              <MessageSquare className="mr-2" /> Tư vấn miễn phí
            </Button>
            <DialogContent className="sm:max-w-[425px]">
              <ConsultationForm setOpen={setIsModalOpen} product={product} />
            </DialogContent>
          </Dialog>

          <div className="grid grid-cols-3 gap-4 text-center mt-4 text-sm">
            <div className="flex flex-col items-center">
              <Truck className="w-8 h-8 text-primary mb-1" />
              <span>Giao hàng toàn quốc</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-8 h-8 text-primary mb-1" />
              <span>Bảo hành 12 tháng</span>
            </div>
            <div className="flex flex-col items-center">
              <Gift className="w-8 h-8 text-primary mb-1" />
              <span>Nhiều quà tặng</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

          <div className="lg:col-span-2">
            <h2 className="text-3xl lg:text-4xl font-headline font-bold mb-6">Mô tả sản phẩm</h2>
            <article className="prose prose-lg max-w-none">
              {product.listProductSection?.sort((a, b) => a.displayOrder - b.displayOrder).map(section => (
                <div key={section.id} className="mb-8">
                  <h2 className="font-headline font-bold text-2xl">{section.title}</h2>
                  {section.pathImage && (
                    <figure className="my-6">
                      <Image
                        src={section.pathImage}
                        alt={`Hình ảnh cho ${section.title}`}
                        width={800}
                        height={450}
                        className="rounded-lg shadow-md mx-auto"
                        data-ai-hint="product feature"
                      />
                    </figure>
                  )}
                  <p>{section.description}</p>
                </div>
              ))}
            </article>
          </div>

          <div className="lg:col-span-1">
            <div>
              <div className="border rounded-lg bg-card sticky top-24">
                <h2 className="text-xl font-headline font-bold p-4 bg-muted rounded-t-lg">
                  Thông số kỹ thuật
                </h2>
                <div className="p-4">
                  <Table className="specs-table">
                    <TableBody>
                      {product.listProductProperties.map((spec, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-semibold">{spec.name}</TableCell>
                          <TableCell>{spec.value}</TableCell>
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
