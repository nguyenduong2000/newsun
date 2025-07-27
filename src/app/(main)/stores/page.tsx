
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Hệ thống chi nhánh",
  description: "Hệ thống chi nhánh và đại lý của Điện máy maythucpham365 trên toàn quốc. Tìm cửa hàng gần bạn nhất.",
};

const storesByRegion = [
  {
    region: "Miền Bắc",
    branches: [
      {
        name: "Showroom Hà Nội",
        address: "1067 Đ. Giải Phóng, Thịnh Liệt, Hoàng Mai, Hà Nội",
        phone: ["0366635562", "0869611128"],
        workingHours: "7:00 - 23:30 (24/7)",
      },
      {
        name: "Showroom Ninh Bình",
        address: "Xã Gia Vân, Tỉnh Ninh Bình",
        phone: ["0366635562", "0869611128"],
        workingHours: "7:00 - 23:30 (24/7)",
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
            Hệ thống chi nhánh & đại lý maythucpham365
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-4xl mx-auto">
            Hiện tại, maythucpham365 đã có mặt trên khắp cả nước với hệ thống 17+ chi nhánh, đáp ứng mọi nhu cầu của khách hàng một cách nhanh chóng và thuận tiện nhất.
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
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.4250210631926!2d105.83857797685569!3d20.975593389599396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac453186d2df%3A0xf9c2f58354b1304f!2zMTA2NyDEkC4gR2nhuqNpIFBow7NuZywgVGjhu4tuaCBMaeG7h3QsIEhvw6BuZyBNYWksIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1753605069717!5m2!1svi!2s" width="100%" height="100%" style={{border:0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>

      </div>
    </div>
  );
}
