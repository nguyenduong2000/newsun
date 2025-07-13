
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ControlledInput } from '@/components/form/controlled-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload, X, Trash2, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { ControlledSelect } from '@/components/form/controlled-select';
import { categories } from '@/lib/mock-data';
import { ControlledCheckbox } from '@/components/form/controlled-checkbox';
import { ControlledCKEditor } from '@/components/form/controlled-ckeditor';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const productFormSchema = z.object({
  productName: z.string().min(3, 'Tên sản phẩm phải có ít nhất 3 ký tự.'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự.'),
  rawPrice: z.coerce.number().min(0, 'Giá không được âm.'),
  salePrice: z.coerce.number().min(0, 'Giá không được âm.'),
  quantity: z.coerce.number().int().min(0, 'Số lượng không được âm.'),
  isSale: z.boolean().default(false),
  categoryId: z.string({ required_error: 'Vui lòng chọn danh mục.' }),
  productCode: z.string().optional(),
  specs: z.array(z.object({
      key: z.string().min(1, 'Tên thông số không được để trống.'),
      value: z.string().min(1, 'Giá trị không được để trống.'),
  })).optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

type ImagePreview = {
  url: string;
  file: File;
};

export default function NewProductPage() {
  const { toast } = useToast();
  const [mainImagePreview, setMainImagePreview] = useState<ImagePreview | null>(null);
  const [subImagePreviews, setSubImagePreviews] = useState<ImagePreview[]>([]);
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const subImagesInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: '',
      description: '',
      rawPrice: 0,
      salePrice: 0,
      quantity: 0,
      isSale: false,
      productCode: '',
      specs: [
        { key: 'Model', value: '' },
        { key: 'Điện áp', value: '' },
        { key: 'Công suất', value: '' },
        { key: 'Bảo hành', value: '12 tháng' },
      ]
    },
  });

  const { control, formState: { isSubmitting } } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'specs',
  });

  const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMainImagePreview({
        url: URL.createObjectURL(file),
        file: file,
      });
    }
  };

  const handleSubImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPreviews = files.map(file => ({
        url: URL.createObjectURL(file),
        file: file,
    }));
    setSubImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeSubImage = (urlToRemove: string) => {
    setSubImagePreviews(prev => prev.filter(preview => preview.url !== urlToRemove));
  };

  const resetForm = () => {
    form.reset();
    setMainImagePreview(null);
    setSubImagePreviews([]);
  }

  async function onSubmit(values: ProductFormValues) {
    const mainImageFile = mainImagePreview?.file;
    const subImageFiles = subImagePreviews.map(p => p.file);
    if (!mainImageFile) {
        toast({
            variant: "destructive",
            title: "Lỗi",
            description: "Vui lòng chọn ảnh đại diện cho sản phẩm."
        })
        return;
    }

    // Convert specs array to object
    const specsObject = values.specs?.reduce((acc, spec) => {
        if(spec.key) acc[spec.key] = spec.value;
        return acc;
    }, {} as Record<string, string>);

    const finalValues = { ...values, specs: specsObject };

    console.log("Final values to submit:", finalValues);
    console.log("Main image to upload:", mainImageFile);
    console.log("Sub-images to upload:", subImageFiles);

    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'Thành công',
      description: `Sản phẩm "${values.productName}" đã được tạo.`,
    });
    resetForm();
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
            Tạo sản phẩm mới
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" type="button" onClick={resetForm}>
              Hủy
            </Button>
            <Button size="sm" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang tạo...' : 'Tạo sản phẩm'}
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Chi tiết sản phẩm</CardTitle>
                <CardDescription>
                  Điền thông tin cơ bản, giá và tồn kho cho sản phẩm mới.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ControlledInput name="productName" control={control} label="Tên sản phẩm" placeholder="Ví dụ: Nồi nấu phở 50L"/>
                 <div className="grid gap-6 sm:grid-cols-2">
                    <ControlledInput name="rawPrice" control={control} label="Giá gốc" type="number" placeholder="0" />
                    <ControlledInput name="salePrice" control={control} label="Giá bán (Sale)" type="number" placeholder="0" />
                    <ControlledInput name="quantity" control={control} label="Số lượng tồn kho" type="number" placeholder="0" />
                    <ControlledInput name="productCode" control={control} label="Mã SKU" placeholder="Vd: NNP-50L" />
                </div>
                <ControlledCKEditor
                  name="description"
                  control={control}
                  label="Mô tả"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thông số kỹ thuật</CardTitle>
                <CardDescription>Thêm các thông số kỹ thuật cho sản phẩm.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-4">
                      <ControlledInput 
                        name={`specs.${index}.key`} 
                        control={control}
                        placeholder="Thuộc tính"
                        className="flex-1"
                      />
                       <ControlledInput 
                        name={`specs.${index}.value`}
                        control={control}
                        placeholder="Giá trị"
                        className="flex-1"
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => append({ key: '', value: '' })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Thêm thông số
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div>
                        <CardTitle>Thư viện ảnh</CardTitle>
                        <CardDescription>Thêm các hình ảnh phụ cho sản phẩm.</CardDescription>
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
                        {subImagePreviews.map((preview) => (
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
                    <CardTitle>Danh mục & Trạng thái</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <ControlledSelect 
                        name="categoryId"
                        control={control}
                        label="Danh mục sản phẩm"
                        placeholder="Chọn danh mục"
                        options={categories.map(c => ({ value: c.id, label: c.name }))}
                    />
                    <ControlledCheckbox
                        name="isSale"
                        control={control}
                        label="Đang giảm giá (isSale)"
                        description="Check vào đây nếu sản phẩm đang được giảm giá."
                    />
                </CardContent>
             </Card>
             <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>Hình ảnh đại diện</CardTitle>
                    <CardDescription>Chọn một hình ảnh đại diện cho sản phẩm.</CardDescription>
                </CardHeader>
                <CardContent>
                    <input
                        type="file"
                        ref={mainImageInputRef}
                        onChange={handleMainImageChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <button 
                        type="button" 
                        className="flex aspect-square w-full items-center justify-center rounded-md border-2 border-dashed hover:border-primary transition-colors relative"
                        onClick={() => mainImageInputRef.current?.click()}
                    >
                        {mainImagePreview ? (
                            <Image
                                src={mainImagePreview.url}
                                alt="Ảnh đại diện preview"
                                fill
                                className="object-cover rounded-md"
                            />
                        ) : (
                             <>
                                <Upload className="h-8 w-8 text-muted-foreground" />
                                <span className="sr-only">Upload</span>
                             </>
                        )}
                    </button>
                </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
