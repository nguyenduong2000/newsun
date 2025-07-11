import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const Logo = () => (
    <Link href="/" className="block">
        <div className="font-headline text-3xl font-bold text-primary tracking-tighter">
        NEWSUN
        </div>
        <div className="text-xs text-muted-foreground font-semibold -mt-1">
        CHUYÊN GIA MÁY THỰC PHẨM
        </div>
  </Link>
);

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Newsun - Thương hiệu điện máy công nghiệp hàng đầu Việt Nam.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons Placeholder */}
            </div>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-lg mb-4">Sản phẩm</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Nồi nấu phở</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Máy xay giò chả</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Tủ hấp công nghiệp</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Bếp chiên</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-lg mb-4">Chính sách</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Chính sách bảo hành</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Chính sách vận chuyển</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Chính sách đổi trả</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-1 shrink-0" />
                <span>Số 123, Đường ABC, Quận XYZ, Hà Nội</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 shrink-0" />
                <a href="tel:19001234" className="hover:text-primary transition-colors">1900 1234</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 shrink-0" />
                <a href="mailto:contact@newsun.com" className="hover:text-primary transition-colors">contact@newsun.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Newsun Reimagined. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
