
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
import { ControlledSelect } from "../form/controlled-select";
import { ControlledRadioGroup } from "../form/controlled-radio-group";
import { ControlledCheckbox } from "../form/controlled-checkbox";

const formSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự."),
  phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ."),
  email: z.string().email("Địa chỉ email không hợp lệ."),
  subject: z.string({ required_error: "Vui lòng chọn chủ đề." }),
  requestType: z.enum(["tu-van", "bao-hanh", "khieu-nai"], {
    required_error: "Bạn cần chọn loại yêu cầu.",
  }),
  message: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự.").max(500, "Nội dung không được quá 500 ký tự."),
  agree: z.boolean().refine((val) => val === true, {
    message: "Bạn phải đồng ý với điều khoản.",
  }),
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
      agree: false,
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
        <ControlledSelect
            control={form.control}
            name="subject"
            label="Chủ đề"
            placeholder="Chọn chủ đề bạn quan tâm"
            options={[
                { value: "san-pham", label: "Tư vấn sản phẩm" },
                { value: "ky-thuat", label: "Hỗ trợ kỹ thuật" },
                { value: "hop-tac", label: "Hợp tác kinh doanh" },
                { value: "khac", label: "Vấn đề khác" },
            ]}
        />
        <ControlledRadioGroup
            control={form.control}
            name="requestType"
            label="Loại yêu cầu"
            options={[
                { value: "tu-van", label: "Tư vấn" },
                { value: "bao-hanh", label: "Bảo hành" },
                { value: "khieu-nai", label: "Khiếu nại" },
            ]}
        />
         <ControlledTextarea
            control={form.control}
            name="message"
            label="Nội dung"
            placeholder="Nội dung bạn muốn trao đổi..."
            className="resize-none"
        />
        <ControlledCheckbox
            control={form.control}
            name="agree"
            label="Đồng ý với điều khoản dịch vụ"
            description="Bằng cách gửi biểu mẫu, bạn đồng ý với chính sách của chúng tôi."
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
        </Button>
      </form>
    </Form>
  );
}
