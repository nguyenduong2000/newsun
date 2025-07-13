
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

const categoryFormSchema = z.object({
  name: z.string().min(2, 'Tên danh mục phải có ít nhất 2 ký tự.'),
  slug: z.string().min(2, 'Đường dẫn tĩnh phải có ít nhất 2 ký tự.'),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export default function NewCategoryPage() {
  const { toast } = useToast();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: CategoryFormValues) {
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'Thành công',
      description: `Danh mục "${values.name}" đã được tạo.`,
    });
    form.reset();
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
            Tạo danh mục mới
          </h1>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Chi tiết danh mục</CardTitle>
                <CardDescription>Điền thông tin cho danh mục mới.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ControlledInput name="name" control={form.control} label="Tên danh mục" placeholder="Ví dụ: Nồi nấu phở" />
                <ControlledInput name="slug" control={form.control} label="Đường dẫn (Slug)" placeholder="vi-du: noi-nau-pho" />
                 <div>
                    <p className="text-sm font-medium mb-2">Hình ảnh</p>
                    <Button variant="outline" type="button">Tải ảnh lên</Button>
                </div>
            </CardContent>
        </Card>
        <div className="flex justify-end gap-2 mt-4">
             <Button variant="outline" type="button" onClick={() => form.reset()}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang tạo...' : 'Tạo danh mục'}
            </Button>
        </div>
      </form>
    </Form>
  );
}
