
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Hệ thống chi nhánh",
  description: "Hệ thống chi nhánh và đại lý của Điện máy Newsun trên toàn quốc. Tìm cửa hàng gần bạn nhất.",
};

const storesByRegion = [
  {
    region: "Miền Bắc",
    branches: [
      {
        name: "Showroom Hà Nội",
        address: "Số 28, ngõ 168 Nguyễn Xiển, P. Hạ Đình, Q.Thanh Xuân, Hà Nội",
        phone: ["0961.997.355", "0766.555.155"],
        workingHours: "8:00 - 17:30 (Thứ 2 - Thứ 7)",
      },
      {
        name: "Showroom Hải Phòng",
        address: "168 Nguyễn Văn Linh, Q. Lê Chân, TP. Hải Phòng",
        phone: ["0961.556.033", "0946.546.033"],
        workingHours: "8:00 - 17:30 (Thứ 2 - Thứ 7)",
      },
      {
        name: "Showroom Quảng Ninh",
        address: "Số 132, đường Cái Lân, P. Bãi Cháy, TP. Hạ Long, Quảng Ninh",
        phone: ["0961.556.033", "0946.546.033"],
        workingHours: "8:00 - 17:30 (Thứ 2 - Thứ 7)",
      },
    ],
  },
  {
    region: "Miền Trung",
    branches: [
      {
        name: "Showroom Đà Nẵng",
        address: "Số 102 Tôn Đức Thắng, Q. Liên Chiểu, TP. Đà Nẵng",
        phone: ["0963.997.355", "0788.555.155"],
        workingHours: "8:00 - 17:30 (Thứ 2 - Thứ 7)",
      },
      {
        name: "Showroom Nghệ An",
        address: "186B Nguyễn Trường Tộ, Hưng Đông, TP. Vinh, Nghệ An",
        phone: ["0961.391.233", "0982.391.233"],
        workingHours: "8:00 - 17:30 (Thứ 2 - Thứ 7)",
      },
    ],
  },
  {
    region: "Miền Nam",
    branches: [
       {
        name: "Showroom Hồ Chí Minh",
        address: "Số 719, đường Lạc Long Quân, P. 10, Q. Tân Bình, TP. HCM",
        phone: ["0965.997.355", "0777.555.155"],
        workingHours: "8:00 - 17:30 (Thứ 2 - Thứ 7)",
      },
       {
        name: "Showroom Cần Thơ",
        address: "Số 23-25, đường A4, KDC 91B, P. An Bình, Q. Ninh Kiều, Cần Thơ",
        phone: ["0983.891.233", "0934.891.233"],
        workingHours: "8:00 - 17:30 (Thứ 2 - Thứ 7)",
      },
    ],
  },
];

export default function StoresPage() {
  return (
    <div className="bg-background">
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-6xl">
        <section className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-primary">
            Hệ thống chi nhánh & đại lý NEWSUN
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-4xl mx-auto">
            Hiện tại, NEWSUN đã có mặt trên khắp cả nước với hệ thống 17+ chi nhánh, đáp ứng mọi nhu cầu của khách hàng một cách nhanh chóng và thuận tiện nhất.
          </p>
        </section>

        <section className="mt-12 md:mt-16 space-y-12">
          {storesByRegion.map((regionData) => (
            <div key={regionData.region}>
              <h2 className="text-2xl md:text-3xl font-headline font-bold mb-6 flex items-center">
                <Dot className="w-10 h-10 text-primary -ml-4" />
                {regionData.region}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionData.branches.map((branch) => (
                  <div key={branch.name} className="border bg-card rounded-lg p-6 flex flex-col transition-shadow hover:shadow-lg">
                    <h3 className="font-bold text-xl text-primary mb-4">{branch.name}</h3>
                    <div className="space-y-3 text-muted-foreground flex-grow">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 mt-1 text-primary shrink-0" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 mt-1 text-primary shrink-0" />
                        <span>{branch.phone.join(" - ")}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 mt-1 text-primary shrink-0" />
                        <span>{branch.workingHours}</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t">
                      <Button variant="outline" className="w-full">
                        <MapPin className="mr-2 h-4 w-4" />
                        Chỉ đường
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">Bản đồ hệ thống</h2>
            <div className="aspect-video w-full border rounded-lg overflow-hidden shadow-xl">
                <Link href="#">
                    <Image 
                        src="https://placehold.co/1200x600.png"
                        alt="Bản đồ hệ thống chi nhánh Newsun"
                        width={1200}
                        height={600}
                        className="w-full h-full object-cover"
                        data-ai-hint="world map"
                    />
                </Link>
            </div>
        </section>

      </div>
    </div>
  );
}
