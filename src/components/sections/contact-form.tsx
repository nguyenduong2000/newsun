
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ControlledInput } from "../form/controlled-input";
import { ControlledTextarea } from "../form/controlled-textarea";

const formSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự."),
  phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ."),
  email: z.string().email("Địa chỉ email không hợp lệ."),
  message: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự.").max(500, "Nội dung không được quá 500 ký tự."),
});

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(values);
    setIsSubmitting(false);

    toast({
      title: "Gửi thành công!",
      description: "Chúng tôi đã nhận được yêu cầu của bạn và sẽ phản hồi sớm nhất.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ControlledInput
            control={form.control}
            name="name"
            label="Họ và tên"
            placeholder="Nguyễn Văn A"
        />
        <ControlledInput
            control={form.control}
            name="phone"
            label="Số điện thoại"
            placeholder="09xxxxxxxx"
        />
        <ControlledInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="email@example.com"
        />
         <ControlledTextarea
            control={form.control}
            name="message"
            label="Nội dung"
            placeholder="Nội dung bạn muốn trao đổi..."
            className="resize-none"
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
        </Button>
      </form>
    </Form>
  );
}
