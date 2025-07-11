import type { Product, Category, NavItem, MegaMenuCategory } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Nồi nấu phở", slug: "noi-nau-pho", image: "https://placehold.co/80x80.png" },
  { id: "2", name: "Máy xay giò chả", slug: "may-xay-gio-cha", image: "https://placehold.co/80x80.png" },
  { id: "3", name: "Tủ hấp công nghiệp", slug: "tu-hap-cong-nghiep", image: "https://placehold.co/80x80.png" },
  { id: "4", name: "Bếp chiên công nghiệp", slug: "bep-chien-cong-nghiep", image: "https://placehold.co/80x80.png" },
  { id: "5", name: "Máy ép mía", slug: "may-ep-mia", image: "https://placehold.co/80x80.png" },
  { id: "6", name: "Máy vặt lông gà", slug: "may-vat-long-ga", image: "https://placehold.co/80x80.png" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Nồi nấu phở bằng điện 50L",
    slug: "noi-nau-pho-dien-50l",
    price: 4500000,
    originalPrice: 5000000,
    description: "Nồi nấu phở bằng điện dung tích 50 lít, chất liệu inox 304 cao cấp, an toàn và bền bỉ. Giữ nhiệt tốt, tiết kiệm điện năng.",
    category: "noi-nau-pho",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/600x600.png", "https://placehold.co/600x600.png", "https://placehold.co/600x600.png"],
    specs: {
      "Dung tích": "50 Lít",
      "Chất liệu": "Inox 304",
      "Công suất": "4 kW",
      "Bảo hành": "12 tháng"
    }
  },
  {
    id: "2",
    name: "Máy xay giò chả 5KG",
    slug: "may-xay-gio-cha-5kg",
    price: 7800000,
    description: "Máy xay giò chả công nghiệp 5KG/mẻ, motor công suất lớn, xay thịt nhuyễn mịn, không nóng. Phù hợp cho các cơ sở sản xuất vừa và nhỏ.",
    category: "may-xay-gio-cha",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/600x600.png", "https://placehold.co/600x600.png"],
    specs: {
      "Năng suất": "5 KG/mẻ",
      "Chất liệu": "Inox",
      "Công suất motor": "3 kW",
      "Bảo hành": "24 tháng"
    }
  },
  {
    id: "3",
    name: "Tủ hấp công nghiệp 8 khay",
    slug: "tu-hap-cong-nghiep-8-khay",
    price: 9200000,
    originalPrice: 9800000,
    description: "Tủ hấp công nghiệp 8 khay đa năng, dùng để hấp bánh bao, hải sản, cơm... Chín nhanh, đều và tiết kiệm thời gian.",
    category: "tu-hap-cong-nghiep",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/600x600.png"],
     specs: {
      "Số khay": "8",
      "Chất liệu": "Inox 201",
      "Nguồn điện": "220V/380V",
      "Bảo hành": "12 tháng"
    }
  },
  {
    id: "4",
    name: "Bếp chiên nhúng điện đơn",
    slug: "bep-chien-nhung-dien-don",
    price: 1500000,
    description: "Bếp chiên nhúng điện đơn dung tích 6 lít, thích hợp cho quán ăn vặt, nhà hàng nhỏ. Gia nhiệt nhanh, điều chỉnh nhiệt độ dễ dàng.",
    category: "bep-chien-cong-nghiep",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/600x600.png"],
     specs: {
      "Dung tích": "6 Lít",
      "Chất liệu": "Inox",
      "Công suất": "2.5 kW",
      "Bảo hành": "6 tháng"
    }
  },
  {
    id: "5",
    name: "Máy ép mía siêu tạo bọt",
    slug: "may-ep-mia-sieu-tao-bot",
    price: 6300000,
    description: "Máy ép mía để bàn, 3 lô ép kiệt nước 99% chỉ trong 1 lần ép. Thiết kế nhỏ gọn, an toàn cho người sử dụng.",
    category: "may-ep-mia",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/600x600.png"],
     specs: {
      "Số lô ép": "3",
      "Công suất": "750W",
      "Nguồn điện": "220V",
      "Bảo hành": "12 tháng"
    }
  },
  {
    id: "6",
    name: "Máy vặt lông gà, vịt phi 55",
    slug: "may-vat-long-ga-phi-55",
    price: 6900000,
    originalPrice: 7500000,
    description: "Máy vặt lông gà, vịt phi 55cm, vặt sạch 95% chỉ trong 60 giây. Giúp tiết kiệm thời gian và nhân công.",
    category: "may-vat-long-ga",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/600x600.png"],
     specs: {
      "Đường kính lồng": "55 cm",
      "Năng suất": "2-3 con/mẻ",
      "Tỷ lệ sạch": "95%",
      "Bảo hành": "12 tháng"
    }
  },
  {
    id: "7",
    name: "Nồi tráng bánh cuốn",
    slug: "noi-trang-banh-cuon",
    price: 3200000,
    description: "Nồi tráng bánh cuốn bằng điện, làm bánh nhanh, mỏng và đều. Thiết kế chuyên nghiệp cho các quán ăn, nhà hàng.",
    category: "thiet-bi-khac",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/600x600.png"],
    specs: {
      "Đường kính": "40 cm",
      "Chất liệu": "Inox",
      "Công suất": "3 kW",
      "Bảo hành": "12 tháng"
    }
  },
  {
    id: "8",
    name: "Máy thái thịt tươi sống",
    slug: "may-thai-thit-tuoi-song",
    price: 4800000,
    description: "Máy thái thịt tươi sống để bàn, cho ra những lát thịt đều, đẹp mắt. Lưỡi dao sắc bén, có thể thay thế.",
    category: "may-xay-gio-cha",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/600x600.png"],
    specs: {
      "Độ dày lát cắt": "2.5mm - 5mm",
      "Năng suất": "150 kg/h",
      "Công suất": "550W",
      "Bảo hành": "12 tháng"
    }
  }
];

export const navItems: Omit<NavItem, 'children'>[] = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Về chúng tôi",
    href: "/about",
  },
  {
    title: "Chi nhánh/Đại lý",
    href: "/stores",
  },
  {
    title: "Hòm thư góp ý",
    href: "/contact",
  },
    {
    title: "Tin tức nổi bật",
    href: "/blog",
  },
];

export const megaMenu: MegaMenuCategory[] = [
    {
        title: 'Thiết bị bếp nhà hàng',
        href: '/products/restaurant-kitchen-equipment',
        children: [
            {
                title: 'Nồi nấu phở',
                href: '/products/category/noi-nau-pho',
                children: [
                    { title: 'Bộ nồi nấu phở bằng điện', href: '/products/product/bo-noi-nau-pho-bang-dien' },
                    { title: 'Nồi nấu phở điện Việt Nam', href: '/products/product/noi-nau-pho-dien-viet-nam' },
                    { title: 'Nồi nấu phở điện nhập khẩu', href: '/products/product/noi-nau-pho-dien-nhap-khau' },
                    { title: 'Phụ kiện nồi nấu phở', href: '/products/product/phu-kien-noi-nau-pho' },
                ]
            },
            {
                title: 'Tủ nấu cơm công nghiệp',
                href: '/products/category/tu-nau-com-cong-nghiep',
                children: [
                    { title: 'Tủ nấu cơm bằng điện', href: '/products/product/tu-nau-com-bang-dien' },
                    { title: 'Tủ nấu cơm bằng gas', href: '/products/product/tu-nau-com-bang-gas' },
                    { title: 'Tủ nấu cơm bằng điện và gas', href: '/products/product/tu-nau-com-bang-dien-va-gas' },
                    { title: 'Phụ kiện tủ nấu cơm', href: '/products/product/phu-kien-tu-nau-com' },
                ]
            },
        ]
    },
    {
        title: 'Máy chế biến thực phẩm',
        href: '/products/food-processing-machine',
        children: [
            {
                title: 'Máy thái rau củ quả',
                href: '/products/category/may-thai-rau-cu-qua',
                children: [
                    { title: 'Máy thái rau củ quả đa năng', href: '/products/product/may-thai-rau-cu-qua-da-nang' },
                    { title: 'Máy thái lát củ quả', href: '/products/product/may-thai-lat-cu-qua' },
                ]
            },
             {
                title: 'Bếp chiên điện',
                href: '/products/category/bep-chien-dien',
                children: [
                    { title: 'Bếp chiên công nghiệp', href: '/products/product/bep-chien-cong-nghiep' },
                    { title: 'Bếp chiên tách dầu', href: '/products/product/bep-chien-tach-dau' },
                ]
            },
        ]
    },
     {
        title: 'Máy chế biến thịt',
        href: '/products/meat-processing-machine',
        children: []
    },
    {
        title: 'Thiết bị làm bánh',
        href: '/products/bakery-equipment',
        children: []
    }
]
