
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ControlledInput } from '@/components/form/controlled-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, PlusCircle, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { products } from '@/lib/mock-data';
import Image from 'next/image';
import { ControlledCKEditor } from '@/components/form/controlled-ckeditor';

const productFormSchema = z.object({
  productName: z.string().min(3, 'Tên sản phẩm phải có ít nhất 3 ký tự.'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự.'),
  salePrice: z.coerce.number().min(0, 'Giá không được âm.'),
  productCode: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export default function EditProductPage() {
  const { toast } = useToast();
  const params = useParams();
  const productId = params.id as string;
  const product = products.find(p => p.id === productId);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: product?.productName || '',
      description: product?.description || '',
      salePrice: product?.salePrice || 0,
      productCode: product?.productCode || '',
    },
  });

  const { isSubmitting } = form.formState;

  if (!product) {
    return notFound();
  }

  async function onSubmit(values: ProductFormValues) {
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'Thành công',
      description: `Sản phẩm "${values.productName}" đã được cập nhật.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {product.productName}
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm">
              Hủy
            </Button>
            <Button size="sm" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang lưu...' : 'Lưu sản phẩm'}
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Chi tiết sản phẩm</CardTitle>
                <CardDescription>
                  Thông tin cơ bản về sản phẩm.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ControlledInput name="productName" control={form.control} label="Tên sản phẩm" />
                <ControlledCKEditor
                  name="description"
                  control={form.control}
                  label="Mô tả"
                />
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Thư viện ảnh</CardTitle>
                            <CardDescription>Quản lý các hình ảnh phụ của sản phẩm.</CardDescription>
                        </div>
                        <Button size="sm" variant="outline" type="button">
                            <Upload className="mr-2 h-4 w-4" />
                            Thêm ảnh
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {product.images.map((image, index) => (
                            <div key={index} className="relative group">
                                <Image
                                    alt={`Product sub-image ${index + 1}`}
                                    className="aspect-square w-full rounded-md object-cover"
                                    height="150"
                                    src={image}
                                    width="150"
                                />
                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="destructive" className="h-7 w-7">
                                        <X className="h-4 w-4"/>
                                        <span className="sr-only">Xóa ảnh</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                         <button type="button" className="flex aspect-square w-full items-center justify-center rounded-md border-2 border-dashed hover:border-primary transition-colors">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <span className="sr-only">Upload</span>
                        </button>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Định giá</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <ControlledInput name="salePrice" control={form.control} label="Giá bán" type="number" />
                        <ControlledInput name="productCode" control={form.control} label="Mã SKU" />
                    </div>
                </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Trạng thái</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Còn hàng</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>Hình ảnh sản phẩm</CardTitle>
                    <CardDescription>Thêm hoặc cập nhật hình ảnh cho sản phẩm.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <div className="relative aspect-square w-full">
                             <Image
                                alt="Product image"
                                className="rounded-md object-cover"
                                fill
                                src={product.pathMainImage}
                            />
                        </div>
                        <Button variant="outline" type="button">
                            <Upload className="mr-2 h-4 w-4" />
                            Thay đổi ảnh đại diện
                        </Button>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
