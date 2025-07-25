import { Phone, Mail, MapPin, Facebook, Youtube, ShieldCheck, Truck, Headset, PackageCheck, MessageCircle, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const servicePromises = [
  {
    icon: PackageCheck,
    title: "SẢN PHẨM CHÍNH HÃNG",
    description: "Sản phẩm có nguồn gốc nhập khẩu và Việt Nam"
  },
  {
    icon: ShieldCheck,
    title: "BẢO HÀNH 12 THÁNG",
    description: "Mọi sản phẩm của NEWSUN được bảo hành 12 tháng, bảo trì trọn đời"
  },
  {
    icon: Truck,
    title: "GIAO HÀNG TOÀN QUỐC",
    description: "Chúng tôi nhận giao hàng toàn quốc 24/7"
  },
  {
    icon: Headset,
    title: "TƯ VẤN MUA HÀNG MIỄN PHÍ",
    description: "Đội ngũ kinh doanh luôn sẵn sàng tư vấn và giải đáp những thắc mắc của khách hàng"
  }
]

const locations = [
    { name: "Hà Nội", address: "Số 28 ngõ 168 Nguyễn Xiển, Thanh Xuân, Hà Nội" },
    { name: "Đà Nẵng", address: "Số 102 Tôn Đức Thắng, Q. Liên Chiểu, Đà Nẵng" },
    { name: "Hồ Chí Minh", address: "Số 719 Lạc Long Quân, Phường 10, Q. Tân Bình, TP. HCM" },
    { name: "Kho hàng tổng", address: "Cụm công nghiệp Ngọc Hồi, Thanh Trì, Hà Nội" }
]

const infoLinks = [
    { title: "Giới thiệu về công ty", href: "/about" },
    { title: "Tin tức nổi bật", href: "/blog" },
    { title: "Liên hệ", href: "/contact" },
    { title: "Chính sách an toàn và bảo mật", href: "#" },
    { title: "Chính sách bán hàng", href: "#" },
    { title: "Chính sách bảo hành", href: "#" },
    { title: "Chính sách đổi trả hàng và hoàn tiền", href: "#" },
    { title: "Chính sách thanh toán", href: "#" },
    { title: "Chính sách vận chuyển", href: "#" },
]

const supportContacts = [
    { title: "Tư vấn Miền Bắc", phone1: "0961.997.355", phone2: "0766.555.155" },
    { title: "Tư vấn Miền Trung", phone1: "0963.997.355", phone2: "0788.555.155" },
    { title: "Tư vấn Miền Nam", phone1: "0965.997.355", phone2: "0777.555.155" },
    { title: "Kỹ thuật & Bảo hành", phone1: "096.139.1551", phone2: "096.239.1551" },
    { title: "Góp ý & Khiếu nại", phone1: "038.871.8871", phone2: "093.466.8811" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
        <div className="border-b border-white/20">
            <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-6xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
                    {servicePromises.map((item, index) => (
                        <div key={index} className="flex items-center justify-center lg:justify-start gap-4">
                            <item.icon className="w-12 h-12 text-white/90 flex-shrink-0"/>
                            <div>
                                <h4 className="font-bold text-sm">{item.title}</h4>
                                <p className="text-xs text-white/80">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div>
            <h3 className="font-headline font-bold text-lg mb-4">Công Ty Cổ Phần SX&XNK Tân Thái Sơn</h3>
             <ul className="space-y-4 text-sm">
                {locations.map((loc, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <Building2 className="w-5 h-5 mt-0.5 shrink-0" />
                        <div>
                            <strong>{loc.name}:</strong> {loc.address}
                            <div><Link href="#" className="text-sm hover:underline text-white/80">Xem bản đồ</Link></div>
                        </div>
                    </li>
                ))}
            </ul>
             <Link href="/stores" className="text-sm hover:underline mt-4 inline-block">Xem tất cả 17 chi nhánh</Link>
          </div>

          <div>
            <h3 className="font-headline font-bold text-lg mb-4">Thông tin khác</h3>
            <ul className="space-y-2 text-sm">
              {infoLinks.map(link => (
                  <li key={link.title}><Link href={link.href} className="hover:underline transition-colors text-white/90">{link.title}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline font-bold text-lg mb-4">Hỗ trợ khách hàng</h3>
            <ul className="space-y-3 text-sm">
              {supportContacts.map(contact => (
                  <li key={contact.title} className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 mt-0.5 shrink-0"/>
                    <div>
                        <span className="font-semibold">{contact.title}:</span>
                        <div className="font-bold">
                            <a href={`tel:${contact.phone1.replace(/\./g, '')}`} className="hover:underline">{contact.phone1}</a> | <a href={`tel:${contact.phone2.replace(/\./g, '')}`} className="hover:underline">{contact.phone2}</a>
                        </div>
                    </div>
                  </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-bold text-lg mb-4">Kết nối với chúng tôi</h3>
            <div className="flex space-x-3 mb-4">
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"><Facebook className="w-5 h-5"/></a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-4.44a4 4 0 0 0-4 4v.13a4 4 0 0 0 1.25 2.87l.9.9a2 2 0 0 1 .59 1.42V14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4.66a2 2 0 0 1 .59-1.42l.9-.9A4 4 0 0 0 16.27 6.13V6a4 4 0 0 0-4.05-4Z"></path><path d="M19.94 15.34c.23-.2.42-.42.59-.66"></path><path d="M19.29 17.58c.41-.53.73-1.1.96-1.7"></path><path d="M21 12.89c.1-.8.1-1.6.1-2.41V10a4 4 0 0 0-1.12-2.88"></path><path d="M4.06 15.34a3.88 3.88 0 0 0 .59.66"></path><path d="M4.71 17.58a3.88 3.88 0 0 0 .96 1.7"></path><path d="M3 12.89a9.68 9.68 0 0 0 .1 2.41V16a4 4 0 0 0 1.12 2.88"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"><Youtube className="w-5 h-5"/></a>
            </div>
            <h3 className="font-headline font-bold text-lg mb-2 mt-4">Website cùng hệ thống</h3>
            <div className="flex flex-wrap gap-2">
                 <Image src="https://placehold.co/110x30.png" width={110} height={30} alt="Dienmaynewsun" data-ai-hint="logo" />
                 <Image src="https://placehold.co/110x30.png" width={110} height={30} alt="Chomay" data-ai-hint="logo" />
            </div>
             <div className="flex flex-wrap gap-2 mt-4">
                 <Image src="https://placehold.co/120x45.png" width={120} height={45} alt="Da Thong Bao" data-ai-hint="logo" />
                 <Image src="https://placehold.co/120x45.png" width={120} height={45} alt="DMCA" data-ai-hint="logo" />
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm text-white/80">
          <p>&copy; {new Date().getFullYear()} Newsun Reimagined. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

    