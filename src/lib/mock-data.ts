
import type { Product, Category, NavItem, MegaMenuCategory } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Thiết bị bếp", slug: "thiet-bi-bep", image: "https://placehold.co/80x80.png", parentId: null, level: 1 },
  { id: "2", name: "Máy chế biến", slug: "may-che-bien", image: "https://placehold.co/80x80.png", parentId: null, level: 1 },
  { id: "3", name: "Nồi nấu phở", slug: "noi-nau-pho", image: "https://placehold.co/80x80.png", parentId: "1", level: 2 },
  { id: "4", name: "Tủ nấu cơm", slug: "tu-nau-com", image: "https://placehold.co/80x80.png", parentId: "1", level: 2 },
  { id: "5", name: "Máy thái thịt", slug: "may-thai-thit", image: "https://placehold.co/80x80.png", parentId: "2", level: 2 },
  { id: "6", name: "Máy xay giò chả", slug: "may-xay-gio-cha", image: "https://placehold.co/80x80.png", parentId: "2", level: 2 },
  { id: "7", name: "Nồi điện 20L", slug: "noi-dien-20l", image: "https://placehold.co/80x80.png", parentId: "3", level: 3 },
  { id: "8", name: "Nồi điện 50L", slug: "noi-dien-50l", image: "https://placehold.co/80x80.png", parentId: "3", level: 3 },
];

export const products: Product[] = [
  {
    id: "1",
    productName: "Nồi nấu phở bằng điện 20L",
    slug: "noi-nau-pho-dien-20l",
    salePrice: 2500000,
    rawPrice: 3500000,
    description: "Nồi nấu phở bằng điện dung tích 20 lít, chất liệu inox 304 cao cấp, an toàn và bền bỉ. Giữ nhiệt tốt, tiết kiệm điện năng.",
    typeCode: "noi-nau-pho",
    categoryId: "7",
    typeName: "Nồi nấu phở",
    pathMainImage: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png?1", "https://placehold.co/400x400.png?2", "https://placehold.co/400x400.png?3", "https://placehold.co/400x400.png?4", "https://placehold.co/400x400.png?5"],
    specs: {
      "Dung tích": "20 Lít",
      "Chất liệu": "Inox 304",
      "Công suất": "3 kW",
      "Bảo hành": "12 tháng"
    },
    starRating: 5,
    reviews: 85,
    purchaseCount: 548,
    quantity: 100,
    isSale: true,
    productCode: "NNP-D20L",
    featuresImage: "https://placehold.co/300x300.png",
    models: ["20L", "30L", "50L", "80L", "100L", "120L"]
  },
  {
    id: "2",
    productName: "Máy xay giò chả 3 kg/mẻ",
    slug: "may-xay-gio-cha-3kg",
    salePrice: 7500000,
    rawPrice: 10500000,
    description: "Máy xay giò chả công nghiệp 3KG/mẻ, motor công suất lớn, xay thịt nhuyễn mịn, không nóng. Phù hợp cho các cơ sở sản xuất.",
    typeCode: "may-xay-gio-cha",
    categoryId: "6",
    typeName: "Máy xay giò chả",
    pathMainImage: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png", "https://placehold.co/400x400.png"],
    specs: {
      "Năng suất": "3 KG/mẻ",
      "Chất liệu": "Inox",
      "Công suất motor": "3 kW (4HP)",
      "Bảo hành": "24 tháng"
    },
    starRating: 5,
    reviews: 2663,
    purchaseCount: 6220,
    quantity: 50,
    isSale: true,
    productCode: "MXGC-3KG",
    featuresImage: "https://placehold.co/300x300.png"
  },
  {
    id: "3",
    productName: "Máy hút chân không cao cấp Kunba DZ400/2SA (2 buồng)",
    slug: "may-hut-chan-khong-kunba-dz400-2sa",
    salePrice: 0,
    rawPrice: 0,
    description: "Máy hút chân không công nghiệp cao cấp Kunba DZ400/2SA với 2 buồng hút, tăng năng suất, phù hợp cho nhà xưởng, xí nghiệp.",
    typeCode: "may-hut-chan-khong",
    categoryId: "2",
    typeName: "Máy hút chân không",
    pathMainImage: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png"],
     specs: {
      "Model": "DZ400/2SA",
      "Loại": "2 buồng",
      "Chất liệu": "Inox",
      "Bảo hành": "12 tháng"
    },
    starRating: 5,
    reviews: 866,
    purchaseCount: 1200,
    quantity: 20,
    isSale: false,
    productCode: "MHCK-DZ400",
    featuresImage: "https://placehold.co/300x300.png"
  },
  {
    id: "4",
    productName: "Máy đùn xúc xích 3 lít quay tay",
    slug: "may-dun-xuc-xich-3-lit-quay-tay",
    salePrice: 2600000,
    rawPrice: 3700000,
    description: "Máy đùn xúc xích quay tay dung tích 3 lít, dễ sử dụng, phù hợp cho gia đình hoặc kinh doanh nhỏ.",
    typeCode: "may-che-bien-thit",
    categoryId: "6",
    typeName: "Máy chế biến thịt",
    pathMainImage: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png"],
     specs: {
      "Dung tích": "3 Lít",
      "Chất liệu": "Inox",
      "Loại": "Quay tay",
      "Bảo hành": "6 tháng"
    },
    starRating: 5,
    reviews: 5526,
    purchaseCount: 6235,
    quantity: 150,
    isSale: true,
    productCode: "MDXX-3LQT",
    featuresImage: "https://placehold.co/300x300.png"
  },
  {
    id: "5",
    productName: "Máy thái thịt tươi sống mini SS-90",
    slug: "may-thai-thit-tuoi-song-mini-ss-90",
    salePrice: 3200000,
    rawPrice: 4500000,
    description: "Máy thái thịt tươi sống mini, công suất 350W, thái nhanh và đều. Thích hợp cho các quán phở, bún chả.",
    typeCode: "may-thai-thit",
    categoryId: "5",
    typeName: "Máy thái thịt",
    pathMainImage: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png"],
     specs: {
      "Công suất": "350W",
      "Năng suất": "30-40kg/giờ",
      "Độ dày lát cắt": "2mm",
      "Bảo hành": "12 tháng"
    },
    starRating: 5,
    reviews: 734,
    purchaseCount: 978,
    quantity: 80,
    isSale: true,
    productCode: "MTT-SS90",
    featuresImage: "https://placehold.co/300x300.png",
    models: ["SS-70", "SS-80", "SS-90", "SS-100"]
  },
  {
    id: "6",
    productName: "Máy vặt lông gà, vịt phi 55",
    slug: "may-vat-long-ga-phi-55",
    salePrice: 6900000,
    rawPrice: 7500000,
    description: "Máy vặt lông gà, vịt phi 55cm, vặt sạch 95% chỉ trong 60 giây. Giúp tiết kiệm thời gian và nhân công.",
    typeCode: "may-vat-long-ga",
    categoryId: "2",
    typeName: "Máy vặt lông gà",
    pathMainImage: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png"],
     specs: {
      "Đường kính lồng": "55 cm",
      "Năng suất": "2-3 con/mẻ",
      "Tỷ lệ sạch": "95%",
      "Bảo hành": "12 tháng"
    },
    starRating: 4,
    reviews: 12,
    purchaseCount: 45,
    quantity: 30,
    isSale: true,
    productCode: "MVLG-P55"
  },
  {
    id: "7",
    productName: "Máy hút chân không gia đình DZ300B mini",
    slug: "may-hut-chan-khong-dz300b-mini",
    salePrice: 1300000,
    rawPrice: 1625000,
    description: "Máy hút chân không gia đình mini, nhỏ gọn, tiện lợi. Giúp bảo quản thực phẩm tươi lâu hơn.",
    typeCode: "may-hut-chan-khong",
    categoryId: "2",
    typeName: "Máy hút chân không",
    pathMainImage: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png"],
     specs: {
      "Công suất hút": "-60-80Kpa",
      "Chất liệu": "Nhựa ABS",
      "Nguồn điện": "220V",
      "Bảo hành": "12 tháng"
    },
    starRating: 5,
    reviews: 124,
    purchaseCount: 241,
    quantity: 200,
    isSale: true,
    productCode: "MHCK-DZ300B",
    featuresImage: "https://placehold.co/300x300.png"
  },
  {
    id: "8",
    productName: "Máy xay giò chả 5KG",
    slug: "may-xay-gio-cha-5kg",
    salePrice: 7800000,
    rawPrice: 8500000,
    description: "Máy xay giò chả công nghiệp 5KG/mẻ, motor công suất lớn, xay thịt nhuyễn mịn, không nóng. Phù hợp cho các cơ sở sản xuất vừa và nhỏ.",
    typeCode: "may-xay-gio-cha",
    categoryId: "6",
    typeName: "Máy xay giò chả",
    pathMainImage: "https://placehold.co/400x400.png",
    images: ["https://placehold.co/400x400.png", "https://placehold.co/400x400.png"],
    specs: {
      "Năng suất": "5 KG/mẻ",
      "Chất liệu": "Inox",
      "Công suất motor": "3 kW",
      "Bảo hành": "24 tháng"
    },
    starRating: 5,
    reviews: 320,
    purchaseCount: 650,
    quantity: 40,
    isSale: false,
    productCode: "MXGC-5KG"
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
