
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  Rocket, 
  Target, 
  Gem, 
  PackageCheck, 
  ShieldCheck, 
  Truck, 
  Headset,
  MapPin,
  Building2
} from "lucide-react";
import { categories } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "./about.css";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description: "Giới thiệu về Công ty Cổ phần SX&XNK Tân Thái Sơn (Newsun) - Chuyên gia máy thực phẩm hàng đầu Việt Nam.",
};

const coreValues = [
    {
        icon: Rocket,
        title: "Tầm nhìn",
        description: "Trở thành thương hiệu hàng đầu Việt Nam trong lĩnh vực cung cấp máy móc và giải pháp công nghệ cho ngành thực phẩm."
    },
    {
        icon: Target,
        title: "Sứ mệnh",
        description: "Mang đến những sản phẩm chất lượng, công nghệ tiên tiến, tối ưu hóa hiệu suất và nâng cao giá trị cho khách hàng."
    },
    {
        icon: Gem,
        title: "Giá trị cốt lõi",
        description: "Lấy chữ TÍN làm trọng, chữ TÂM làm gốc. Luôn đặt lợi ích của khách hàng và đối tác lên hàng đầu."
    }
]

const historyMilestones = [
  {
    year: "2015",
    title: "Thành lập",
    description: "Công ty NEWSUN được thành lập, khởi đầu với việc cung cấp các thiết bị bếp công nghiệp cơ bản.",
    image: "https://placehold.co/500x300.png",
    aiHint: "company office",
  },
  {
    year: "2017",
    title: "Mở rộng sản phẩm",
    description: "Đa dạng hóa danh mục sản phẩm, tập trung vào các dòng máy chế biến thực phẩm chuyên sâu.",
    image: "https://placehold.co/500x300.png",
    aiHint: "factory machine",
  },
  {
    year: "2019",
    title: "Phát triển chi nhánh",
    description: "Khai trương chi nhánh tại Đà Nẵng và TP. Hồ Chí Minh, đánh dấu bước phát triển vượt bậc.",
    image: "https://placehold.co/500x300.png",
    aiHint: "city storefront",
  },
  {
    year: "2022",
    title: "Dẫn đầu thị trường",
    description: "Trở thành một trong những đơn vị uy tín hàng đầu, được hàng chục nghìn khách hàng trên cả nước tin dùng.",
    image: "https://placehold.co/500x300.png",
    aiHint: "team celebration",
  }
];

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
    { name: "Hải Phòng", address: "168 Nguyễn Văn Linh, Lê Chân, Hải Phòng" },
    { name: "Nghệ An", address: "Số 186B Nguyễn Trường Tộ, Hưng Đông, TP. Vinh" },
    { name: "Cần Thơ", address: "Số 23-25, Đường A4, KDC 91B, An Bình, Ninh Kiều, Cần Thơ" },
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-6xl">

        <section className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-primary">
            Giới thiệu về công ty NEWSUN
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-4xl mx-auto">
            NEWSUN - Chuyên gia máy thực phẩm hàng đầu Việt Nam, tự hào là đơn vị tiên phong trong lĩnh vực nhập khẩu và phân phối máy chế biến thực phẩm, thiết bị bếp công nghiệp.
          </p>
        </section>

        <section className="mt-12 md:mt-16">
            <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl border">
                 <iframe 
                    className="w-full h-full" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            </div>
        </section>

        <section className="mt-12 md:mt-20">
            <div className="grid md:grid-cols-3 gap-8 text-center">
                {coreValues.map((value, index) => (
                    <div key={index} className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                            <value.icon className="w-8 h-8"/>
                        </div>
                        <h2 className="text-2xl font-headline font-bold">{value.title}</h2>
                        <p className="mt-2 text-muted-foreground">{value.description}</p>
                    </div>
                ))}
            </div>
        </section>
        
        <section className="mt-12 md:mt-20">
           <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Lịch sử hình thành & phát triển</h2>
           <div className="relative wrap overflow-hidden p-10 h-full">
                <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{left: '50%'}}></div>
                {historyMilestones.map((item, index) => (
                    <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
                         <div className="order-1 w-5/12"></div>
                         <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-12 h-12 rounded-full">
                            <h3 className="mx-auto font-bold text-lg text-white">{item.year}</h3>
                        </div>
                        <div className="order-1 bg-card rounded-lg shadow-xl w-5/12 px-6 py-4 border">
                            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                            <p className="text-sm leading-snug tracking-wide text-muted-foreground">{item.description}</p>
                            <div className="mt-4 aspect-video rounded-md overflow-hidden">
                                <Image src={item.image} alt={item.title} width={500} height={300} className="w-full h-full object-cover" data-ai-hint={item.aiHint} />
                            </div>
                        </div>
                    </div>
                ))}
           </div>
        </section>

        <section className="mt-12 md:mt-20">
           <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Các dòng sản phẩm NEWSUN cung cấp</h2>
           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link href={`/products?category=${category.slug}`} key={category.id} className="block group">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-lg">
                  <CardContent className="p-4 text-center">
                    <div className="relative w-24 h-24 mx-auto">
                      <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-contain rounded-full bg-gray-100 p-2"
                          data-ai-hint="kitchen appliance"
                        />
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors mt-4">
                        {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 md:mt-20 bg-muted py-12 rounded-lg">
             <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Cam kết của NEWSUN</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center px-6">
                {servicePromises.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <item.icon className="w-12 h-12 text-primary mb-3"/>
                        <h4 className="font-bold text-lg">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
        
        <section className="mt-12 md:mt-20">
             <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Hệ thống chi nhánh NEWSUN toàn quốc</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((loc, index) => (
                    <div key={index} className="bg-card p-6 rounded-lg border shadow-sm flex flex-col">
                        <div className="flex items-start gap-4">
                            <Building2 className="w-8 h-8 text-primary mt-1 shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg">{loc.name}</h3>
                                <p className="text-muted-foreground mt-1">{loc.address}</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t flex-grow flex items-end">
                            <Button variant="outline" className="w-full">
                                <MapPin className="mr-2"/>
                                Xem bản đồ
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-8">
                <Button size="lg">Xem tất cả 17 chi nhánh</Button>
            </div>
        </section>

      </div>
    </div>
  );
}
