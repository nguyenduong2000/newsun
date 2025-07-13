
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ControlledInput } from '@/components/form/controlled-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { categories } from '@/lib/mock-data';
import Image from 'next/image';

const categoryFormSchema = z.object({
  name: z.string().min(2, 'Tên danh mục phải có ít nhất 2 ký tự.'),
  slug: z.string().min(2, 'Đường dẫn tĩnh phải có ít nhất 2 ký tự.'),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export default function EditCategoryPage() {
  const { toast } = useToast();
  const params = useParams();
  const categoryId = params.id as string;
  const category = categories.find(c => c.id === categoryId);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name || '',
      slug: category?.slug || '',
    },
  });

  const { isSubmitting } = form.formState;

  if (!category) {
    return notFound();
  }

  async function onSubmit(values: CategoryFormValues) {
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'Thành công',
      description: `Danh mục "${values.name}" đã được cập nhật.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/admin/categories">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight">
            Sửa danh mục
          </h1>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Chi tiết danh mục</CardTitle>
                <CardDescription>Cập nhật thông tin cho danh mục.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ControlledInput name="name" control={form.control} label="Tên danh mục" />
                <ControlledInput name="slug" control={form.control} label="Đường dẫn (Slug)" />
                <div>
                    <p className="text-sm font-medium mb-2">Hình ảnh</p>
                    <div className='flex items-end gap-4'>
                        <Image
                            src={category.image}
                            alt={category.name}
                            width={80}
                            height={80}
                            className='rounded-md border p-1'
                        />
                        <Button variant="outline" type="button">Thay đổi ảnh</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
        <div className="flex justify-end gap-2 mt-4">
             <Button variant="outline" type="button">
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
        </div>
      </form>
    </Form>
  );
}
