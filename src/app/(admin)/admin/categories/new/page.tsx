
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ControlledInput } from '@/components/form/controlled-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';
import { ControlledSelect } from '@/components/form/controlled-select';
import { categories } from '@/lib/mock-data';
import React, { useRef, useState } from 'react';
import Image from 'next/image';

const categoryFormSchema = z.object({
  name: z.string().min(2, 'Tên danh mục phải có ít nhất 2 ký tự.'),
  slug: z.string().min(2, 'Đường dẫn tĩnh phải có ít nhất 2 ký tự.'),
  parentId: z.string().nullable().optional(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;
type ImagePreview = {
  url: string;
  file: File;
};


const getCategoryOptions = () => {
    const options: { value: string; label: string }[] = [{ value: 'null', label: 'Không có' }];
    const buildOptions = (parentId: string | null, level: number) => {
        categories
            .filter(c => c.parentId === parentId)
            .forEach(c => {
                // Only allow categories with level < 3 to be parents
                if (c.level < 3) {
                     options.push({
                        value: c.id,
                        label: `${'--'.repeat(level)} ${c.name}`
                    });
                    buildOptions(c.id, level + 1);
                }
            });
    };
    buildOptions(null, 0);
    return options;
};

export default function NewCategoryPage() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      slug: '',
      parentId: 'null',
    },
  });

  const { isSubmitting } = form.formState;
  const categoryOptions = getCategoryOptions();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview({
        url: URL.createObjectURL(file),
        file: file,
      });
    }
  };

  const resetForm = () => {
      form.reset();
      setImagePreview(null);
  }

  async function onSubmit(values: CategoryFormValues) {
    if (!imagePreview?.file) {
        toast({
            variant: "destructive",
            title: "Lỗi",
            description: "Vui lòng tải lên hình ảnh cho danh mục."
        });
        return;
    }
    
    const finalValues = {
        ...values,
        parentId: values.parentId === 'null' ? null : values.parentId,
        imageFile: imagePreview.file
    }
    console.log(finalValues);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'Thành công',
      description: `Danh mục "${values.name}" đã được tạo.`,
    });
    resetForm();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-3 flex items-center gap-4 mb-0">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/admin/categories">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight">
            Tạo danh mục mới
          </h1>
           <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" type="button" onClick={resetForm}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang tạo...' : 'Tạo danh mục'}
            </Button>
          </div>
        </div>

        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Chi tiết danh mục</CardTitle>
                    <CardDescription>Điền thông tin cho danh mục mới.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ControlledInput name="name" control={form.control} label="Tên danh mục" placeholder="Ví dụ: Nồi nấu phở" />
                    <ControlledInput name="slug" control={form.control} label="Đường dẫn (Slug)" placeholder="vi-du: noi-nau-pho" />
                    <ControlledSelect 
                        name="parentId"
                        control={form.control}
                        label="Danh mục cha"
                        placeholder="Chọn danh mục cha"
                        options={categoryOptions}
                    />
                </CardContent>
            </Card>
        </div>
        
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>Hình ảnh danh mục</CardTitle>
                    <CardDescription>Thêm hình ảnh cho danh mục.</CardDescription>
                </CardHeader>
                <CardContent>
                     <input
                        type="file"
                        ref={imageInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                    />
                     <button 
                        type="button" 
                        className="flex aspect-square w-full items-center justify-center rounded-md border-2 border-dashed hover:border-primary transition-colors relative"
                        onClick={() => imageInputRef.current?.click()}
                    >
                        {imagePreview ? (
                            <Image
                                src={imagePreview.url}
                                alt="Xem trước ảnh danh mục"
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
      </form>
    </Form>
  );
}
