
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { ControlledInput } from '@/components/form/controlled-input';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const loginFormSchema = z.object({
  email: z.string().email('Địa chỉ email không hợp lệ.'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự.'),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsSubmitting(true);
    console.log('Login attempt:', values);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success
    toast({
      title: 'Đăng nhập thành công!',
      description: `Chào mừng trở lại, ${values.email}.`,
    });
    
    // In a real app, you would redirect the user here
    // e.g., router.push('/dashboard');

    setIsSubmitting(false);
  }

  return (
    <div className="flex items-center justify-center py-12 md:py-24">
      <Card className="mx-auto w-full max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-2xl">Đăng nhập</CardTitle>
              <CardDescription>
                Nhập email và mật khẩu của bạn để truy cập vào tài khoản.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ControlledInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="m@example.com"
                type="email"
                autoComplete="email"
              />
              <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Mật khẩu</label>
                    <Link href="#" className="inline-block text-sm underline">
                        Quên mật khẩu?
                    </Link>
                 </div>
                <ControlledInput
                  control={form.control}
                  name="password"
                  type="password"
                />
              </div>
            </CardContent>
            <CardContent>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
                <div className="mt-4 text-center text-sm">
                    Chưa có tài khoản?{' '}
                    <Link href="#" className="underline">
                        Đăng ký
                    </Link>
                </div>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
