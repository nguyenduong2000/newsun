import { ContactForm } from "@/components/sections/contact-form";
import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ với Điện máy Newsun để được tư vấn và hỗ trợ về các sản phẩm máy móc công nghiệp.",
};

export default function ContactPage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-center mb-4">
        Liên hệ với chúng tôi
      </h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
        Chúng tôi luôn sẵn sàng lắng nghe bạn. Vui lòng điền vào biểu mẫu bên
        dưới hoặc liên hệ trực tiếp qua thông tin được cung cấp.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-card p-8 rounded-lg shadow-sm">
          <h2 className="font-headline text-2xl font-bold mb-6">Gửi yêu cầu</h2>
          <ContactForm />
        </div>
        <div className="space-y-8">
          <h2 className="font-headline text-2xl font-bold">Thông tin liên hệ</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                 <MapPin className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Địa chỉ</h3>
                <p className="text-muted-foreground">Số 123, Đường ABC, Quận XYZ, Hà Nội</p>
              </div>
            </div>
             <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                 <Phone className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Hotline</h3>
                <p className="text-muted-foreground"><a href="tel:19001234" className="hover:text-primary">1900 1234</a></p>
              </div>
            </div>
             <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                 <Mail className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-muted-foreground"><a href="mailto:contact@newsun.com" className="hover:text-primary">contact@newsun.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
