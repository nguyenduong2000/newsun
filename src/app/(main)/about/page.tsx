
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
import { Button } from "@/components/ui/button";
import "./about.css";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description: "Giới thiệu về Công ty Cổ phần SX&XNK Tân Thái Sơn (maythucpham365) - Chuyên gia máy thực phẩm hàng đầu Việt Nam.",
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

const servicePromises = [
  {
    icon: PackageCheck,
    title: "SẢN PHẨM CHÍNH HÃNG",
    description: "Sản phẩm có nguồn gốc nhập khẩu và Việt Nam"
  },
  {
    icon: ShieldCheck,
    title: "BẢO HÀNH 12 THÁNG",
    description: "Mọi sản phẩm của maythucpham365 được bảo hành 12 tháng, bảo trì trọn đời"
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
            Giới thiệu về công ty maythucpham365
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-4xl mx-auto">
            maythucpham365 - Chuyên gia máy thực phẩm hàng đầu Việt Nam, tự hào là đơn vị tiên phong trong lĩnh vực nhập khẩu và phân phối máy chế biến thực phẩm, thiết bị bếp công nghiệp.
          </p>
        </section>

        <section className="mt-12 md:mt-16">
          <h2 className="text-2xl capitalize font-semibold">Quá trình hình thành</h2>
          <p className="mt-4 text-lg text-gray-900 text-start">
            Với mục tiêu “Người Việt dùng hàng Việt”. Công ty maythucpham365 đã dày công nghiên cứu, phát triển, sản xuất các loại “Máy thực phẩm” Cung cấp những giải pháp lựa chọn ứng dụng máy móc, thiết bị công nghiệp vào thực tiễn. Hỗ trợ cho bà con kinh doanh ẩm thực trong và ngoài nước tăng năng suất, hiệu quả công việc mà giảm bớt sức lực và chi phí nhân công. Chúng tôi đã và đang vẫn luôn cố gắng mang thềm nhiều giải pháp đột phá hơn nữa với ưu tiên chất lượng là cốt lõi của sự phát triển. Các sản phẩm của Tân Thái Sơn cung cấp đều được các tổ chức trong và ngoài nước thẩm định, đánh giá cao.
          </p>
        </section>
        <section className="mt-12 md:mt-16">
          <h2 className="text-2xl capitalize font-semibold">Ngành nghề</h2>
          <p className="mt-4 text-lg text-gray-900 text-start">
           Sản xuất và kinh doanh các sản phẩm thiết bị liên quan đến lĩnh vực:<br/>

Thiết bị nhà bếp công nghiệp <br/>

Thiết bị chế biến thực phẩm<br/>

Thiết bị chế biến nông sản<br/>

Thiết bị chế biến đồ ăn nhanh<br/>

Thiết bị làm bánh<br/>

Máy đóng gói thực phẩm<br/>

Dây chuyền thiết bị khác<br/>

Giúp tăng năng suất của quý bà con, doanh nghiệp trên cả nước. Để sản phẩm làm ra được nhanh hơn, hiệu quả hơn, tiết kiệm chi phí nguyên liệu, thời gian và nhân công. Đạt hiệu quả sản xuất công nghiệp cao.
          </p>
        </section>

        <section className="mt-12 md:mt-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {coreValues.map((value, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <value.icon className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-headline font-bold">{value.title}</h2>
                <p className="mt-2 text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 md:mt-16 bg-muted py-12 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Cam kết của maythucpham365</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center px-6">
            {servicePromises.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <item.icon className="w-12 h-12 text-primary mb-3" />
                <h4 className="font-bold text-lg">{item.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 md:mt-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Hệ thống chi nhánh maythucpham365 toàn quốc</h2>
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
                    <MapPin className="mr-2" />
                    Xem bản đồ
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="/stores">Xem tất cả 17 chi nhánh</Link>
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
}
