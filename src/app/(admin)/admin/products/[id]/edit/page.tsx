
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ControlledInput } from '@/components/form/controlled-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { products } from '@/lib/mock-data';
import Image from 'next/image';
import { ControlledCKEditor } from '@/components/form/controlled-ckeditor';
import React, 'use-client';
import { useState, useRef } from 'react';

const productFormSchema = z.object({
  productName: z.string().min(3, 'Tên sản phẩm phải có ít nhất 3 ký tự.'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự.'),
  rawPrice: z.coerce.number().min(0, 'Giá không được âm.'),
  salePrice: z.coerce.number().min(0, 'Giá không được âm.'),
  quantity: z.coerce.number().int().min(0, 'Số lượng không được âm.'),
  productCode: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

type ImagePreview = {
  url: string;
  file?: File;
  isNew: boolean;
};

export default function EditProductPage() {
  const { toast } = useToast();
  const params = useParams();
  const productId = params.id as string;
  const product = products.find(p => p.id === productId);

  const [mainImagePreview, setMainImagePreview] = useState<ImagePreview | null>(
    product ? { url: product.pathMainImage, isNew: false } : null
  );
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>(
    product ? product.images.map(url => ({ url, isNew: false })) : []
  );
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const subImagesInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: product?.productName || '',
      description: product?.description || '',
      rawPrice: product?.rawPrice || 0,
      salePrice: product?.salePrice || 0,
      quantity: product?.quantity || 0,
      productCode: product?.productCode || '',
    },
  });

  const { isSubmitting } = form.formState;

  if (!product) {
    return notFound();
  }
  
  const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMainImagePreview({
        url: URL.createObjectURL(file),
        file: file,
        isNew: true,
      });
    }
  };

  const handleSubImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPreviews = files.map(file => ({
        url: URL.createObjectURL(file),
        file: file,
        isNew: true
    }));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeSubImage = (urlToRemove: string) => {
    setImagePreviews(prev => prev.filter(preview => preview.url !== urlToRemove));
  };


  async function onSubmit(values: ProductFormValues) {
    console.log(values);
    // You would handle the upload of new image files here
    const newMainImageFile = mainImagePreview?.isNew ? mainImagePreview.file : undefined;
    const newSubImageFiles = imagePreviews.filter(p => p.isNew).map(p => p.file);

    console.log("New main image to upload:", newMainImageFile);
    console.log("New sub-images to upload:", newSubImageFiles);

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
                  Chỉnh sửa thông tin, giá và tồn kho cho sản phẩm.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ControlledInput name="productName" control={form.control} label="Tên sản phẩm" />
                <div className="grid gap-6 sm:grid-cols-2">
                    <ControlledInput name="rawPrice" control={form.control} label="Giá gốc" type="number" placeholder="0" />
                    <ControlledInput name="salePrice" control={form.control} label="Giá bán (Sale)" type="number" placeholder="0" />
                    <ControlledInput name="quantity" control={form.control} label="Số lượng tồn kho" type="number" placeholder="0" />
                    <ControlledInput name="productCode" control={form.control} label="Mã SKU" />
                </div>
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
                    </div>
                </CardHeader>
                <CardContent>
                     <input
                        type="file"
                        ref={subImagesInputRef}
                        onChange={handleSubImagesChange}
                        multiple
                        className="hidden"
                        accept="image/*"
                    />
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                        {imagePreviews.map((preview) => (
                            <div key={preview.url} className="relative group aspect-square">
                                <Image
                                    alt="Product sub-image preview"
                                    className="w-full h-full rounded-md object-cover"
                                    fill
                                    src={preview.url}
                                />
                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button 
                                        size="icon" 
                                        variant="destructive" 
                                        className="h-6 w-6" 
                                        type="button" 
                                        onClick={() => removeSubImage(preview.url)}
                                    >
                                        <X className="h-3 w-3"/>
                                        <span className="sr-only">Xóa ảnh</span>
                                    </Button>
                                </div>
                                {preview.isNew && <div className="absolute bottom-0 w-full text-center bg-blue-500/80 text-white text-xs py-0.5 rounded-b-md">Mới</div>}
                            </div>
                        ))}
                         <button 
                            type="button" 
                            className="flex aspect-square w-full items-center justify-center rounded-md border-2 border-dashed hover:border-primary transition-colors"
                            onClick={() => subImagesInputRef.current?.click()}
                          >
                            <Upload className="h-6 w-6 text-muted-foreground" />
                            <span className="sr-only">Upload</span>
                        </button>
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
                     <input
                        type="file"
                        ref={mainImageInputRef}
                        onChange={handleMainImageChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <div className="grid gap-2">
                        <div className="relative aspect-square w-full">
                            {mainImagePreview ? (
                                <Image
                                    alt="Product image preview"
                                    className="rounded-md object-cover"
                                    fill
                                    src={mainImagePreview.url}
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full bg-muted rounded-md">
                                     <p className="text-muted-foreground text-sm">Chưa có ảnh</p>
                                </div>
                            )}
                        </div>
                        <Button variant="outline" type="button" onClick={() => mainImageInputRef.current?.click()}>
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
