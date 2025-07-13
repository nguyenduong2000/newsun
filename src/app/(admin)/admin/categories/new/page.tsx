
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
import { ControlledSelect } from '@/components/form/controlled-select';
import { categories } from '@/lib/mock-data';

const categoryFormSchema = z.object({
  name: z.string().min(2, 'Tên danh mục phải có ít nhất 2 ký tự.'),
  slug: z.string().min(2, 'Đường dẫn tĩnh phải có ít nhất 2 ký tự.'),
  parentId: z.string().nullable().optional(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

const getCategoryOptions = () => {
    const options: { value: string; label: string }[] = [{ value: 'null', label: 'Không có' }];
    const buildOptions = (parentId: string | null, level: number) => {
        categories
            .filter(c => c.parentId === parentId && c.level < 3)
            .forEach(c => {
                options.push({
                    value: c.id,
                    label: `${'--'.repeat(level)} ${c.name}`
                });
                buildOptions(c.id, level + 1);
            });
    };
    buildOptions(null, 0);
    return options;
};

export default function NewCategoryPage() {
  const { toast } = useToast();
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

  async function onSubmit(values: CategoryFormValues) {
    const finalValues = {
        ...values,
        parentId: values.parentId === 'null' ? null : values.parentId,
    }
    console.log(finalValues);
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
                <ControlledSelect 
                    name="parentId"
                    control={form.control}
                    label="Danh mục cha"
                    placeholder="Chọn danh mục cha"
                    options={categoryOptions}
                />
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
