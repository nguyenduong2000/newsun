
import { ContactForm } from "@/components/sections/contact-form";
import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Hòm thư góp ý",
  description: "Gửi góp ý, khiếu nại hoặc yêu cầu hỗ trợ tới Điện máy maythucpham365. Chúng tôi luôn lắng nghe ý kiến của bạn.",
};

export default function ContactPage() {
  return (
    <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4">
          Hòm thư góp ý khách hàng
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto mb-12">
          Cảm ơn Quý khách hàng đã tin tưởng và sử dụng sản phẩm, dịch vụ của maythucpham365. Để nâng cao chất lượng dịch vụ, chúng tôi rất mong nhận được những ý kiến đóng góp, phản hồi của Quý khách.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-card p-8 rounded-lg shadow-sm border w-full max-w-2xl">
          <h2 className="font-headline text-2xl font-bold mb-6 text-center">Gửi yêu cầu của bạn</h2>
          <ContactForm />
        </div>
        
        <div className="mt-16 w-full max-w-3xl">
           <h2 className="text-2xl font-headline font-bold text-center mb-8">Thông tin liên hệ maythucpham365</h2>
           <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                 <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Địa chỉ</h3>
                <p className="text-muted-foreground text-sm">Số 123, Đường ABC, Quận XYZ, Hà Nội</p>
              </div>
            </div>
             <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                 <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Hotline</h3>
                <p className="text-muted-foreground text-sm"><a href="tel:19001234" className="hover:text-primary">1900 1234</a></p>
              </div>
            </div>
             <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                 <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-muted-foreground text-sm"><a href="mailto:contact@newsun.com" className="hover:text-primary">contact@newsun.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
