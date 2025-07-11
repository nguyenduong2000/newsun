import type { Product, Category, NavItem, MegaMenuCategory } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Nồi nấu phở", slug: "noi-nau-pho", image: "https://placehold.co/80x80.png" },
  { id: "2", name: "Tủ nấu cơm", slug: "tu-nau-com", image: "https://placehold.co/80x80.png" },
  { id: "3", name: "Máy hút chân không", slug: "may-hut-chan-khong", image: "https://placehold.co/80x80.png" },
  { id: "4", name: "Máy thái thịt", slug: "may-thai-thit", image: "https://placehold.co/80x80.png" },
  { id: "5", name: "Máy ép mía", slug: "may-ep-mia", image: "https://placehold.co/80x80.png" },
  { id: "6", name: "Máy vặt lông gà", slug: "may-vat-long-ga", image: "https://placehold.co/80x80.png" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Nồi nấu phở bằng điện 20L",
    slug: "noi-nau-pho-dien-20l",
    price: 2500000,
    originalPrice: 3500000,
    description: "Nồi nấu phở bằng điện dung tích 20 lít, chất liệu inox 304 cao cấp, an toàn và bền bỉ. Giữ nhiệt tốt, tiết kiệm điện năng.",
    category: "noi-nau-pho",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png?1", "https://placehold.co/400x400.png?2", "https://placehold.co/400x400.png?3", "https://placehold.co/400x400.png?4", "https://placehold.co/400x400.png?5"],
    specs: {
      "Dung tích": "20 Lít",
      "Chất liệu": "Inox 304",
      "Công suất": "3 kW",
      "Bảo hành": "12 tháng"
    },
    rating: 5,
    reviews: 85,
    sold: 548,
    featuresImage: "https://placehold.co/300x300.png",
    models: ["20L", "30L", "50L", "80L", "100L", "120L"]
  },
  {
    id: "2",
    name: "Máy xay giò chả 3 kg/mẻ",
    slug: "may-xay-gio-cha-3kg",
    price: 7500000,
    originalPrice: 10500000,
    description: "Máy xay giò chả công nghiệp 3KG/mẻ, motor công suất lớn, xay thịt nhuyễn mịn, không nóng. Phù hợp cho các cơ sở sản xuất.",
    category: "may-xay-gio-cha",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png", "https://placehold.co/400x400.png"],
    specs: {
      "Năng suất": "3 KG/mẻ",
      "Chất liệu": "Inox",
      "Công suất motor": "3 kW (4HP)",
      "Bảo hành": "24 tháng"
    },
    rating: 5,
    reviews: 2663,
    sold: 6220,
    featuresImage: "https://placehold.co/300x300.png"
  },
  {
    id: "3",
    name: "Máy hút chân không cao cấp Kunba DZ400/2SA (2 buồng)",
    slug: "may-hut-chan-khong-kunba-dz400-2sa",
    price: 0,
    description: "Máy hút chân không công nghiệp cao cấp Kunba DZ400/2SA với 2 buồng hút, tăng năng suất, phù hợp cho nhà xưởng, xí nghiệp.",
    category: "may-hut-chan-khong",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png"],
     specs: {
      "Model": "DZ400/2SA",
      "Loại": "2 buồng",
      "Chất liệu": "Inox",
      "Bảo hành": "12 tháng"
    },
    rating: 5,
    reviews: 866,
    sold: 1200,
    featuresImage: "https://placehold.co/300x300.png"
  },
  {
    id: "4",
    name: "Máy đùn xúc xích 3 lít quay tay",
    slug: "may-dun-xuc-xich-3-lit-quay-tay",
    price: 2600000,
    originalPrice: 3700000,
    description: "Máy đùn xúc xích quay tay dung tích 3 lít, dễ sử dụng, phù hợp cho gia đình hoặc kinh doanh nhỏ.",
    category: "may-che-bien-thit",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png"],
     specs: {
      "Dung tích": "3 Lít",
      "Chất liệu": "Inox",
      "Loại": "Quay tay",
      "Bảo hành": "6 tháng"
    },
    rating: 5,
    reviews: 5526,
    sold: 6235,
    featuresImage: "https://placehold.co/300x300.png"
  },
  {
    id: "5",
    name: "Máy thái thịt tươi sống mini SS-90",
    slug: "may-thai-thit-tuoi-song-mini-ss-90",
    price: 3200000,
    originalPrice: 4500000,
    description: "Máy thái thịt tươi sống mini, công suất 350W, thái nhanh và đều. Thích hợp cho các quán phở, bún chả.",
    category: "may-thai-thit",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png"],
     specs: {
      "Công suất": "350W",
      "Năng suất": "30-40kg/giờ",
      "Độ dày lát cắt": "2mm",
      "Bảo hành": "12 tháng"
    },
    rating: 5,
    reviews: 734,
    sold: 978,
    featuresImage: "https://placehold.co/300x300.png",
    models: ["SS-70", "SS-80", "SS-90", "SS-100"]
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
    images: ["https://placehold.co/400x400.png"],
     specs: {
      "Đường kính lồng": "55 cm",
      "Năng suất": "2-3 con/mẻ",
      "Tỷ lệ sạch": "95%",
      "Bảo hành": "12 tháng"
    },
    rating: 4,
    reviews: 12,
    sold: 45
  },
  {
    id: "7",
    name: "Máy hút chân không gia đình DZ300B mini",
    slug: "may-hut-chan-khong-dz300b-mini",
    price: 1300000,
    originalPrice: 1625000,
    description: "Máy hút chân không gia đình mini, nhỏ gọn, tiện lợi. Giúp bảo quản thực phẩm tươi lâu hơn.",
    category: "may-hut-chan-khong",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png"],
     specs: {
      "Công suất hút": "-60-80Kpa",
      "Chất liệu": "Nhựa ABS",
      "Nguồn điện": "220V",
      "Bảo hành": "12 tháng"
    },
    rating: 5,
    reviews: 124,
    sold: 241,
    featuresImage: "https://placehold.co/300x300.png"
  },
  {
    id: "8",
    name: "Máy xay giò chả 5KG",
    slug: "may-xay-gio-cha-5kg",
    price: 7800000,
    description: "Máy xay giò chả công nghiệp 5KG/mẻ, motor công suất lớn, xay thịt nhuyễn mịn, không nóng. Phù hợp cho các cơ sở sản xuất vừa và nhỏ.",
    category: "may-xay-gio-cha",
    image: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png", "https://placehold.co/400x400.png"],
    specs: {
      "Năng suất": "5 KG/mẻ",
      "Chất liệu": "Inox",
      "Công suất motor": "3 kW",
      "Bảo hành": "24 tháng"
    },
    rating: 5,
    reviews: 320,
    sold: 650
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
