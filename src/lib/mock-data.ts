

import type { Product, Category, NavItem, MegaMenuCategory, Banner, ApiCategory, ApiProduct, ApiProductType } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Thiết bị bếp", slug: "thiet-bi-bep", image: "https://dienmaynewsun.com/wp-content/uploads/2023/05/may-thai-thit.jpg", parentId: null, level: 1 },
  { id: "2", name: "Máy chế biến", slug: "may-che-bien", image: "https://dienmaynewsun.com/wp-content/uploads/2023/05/may-thai-thit.jpg", parentId: null, level: 1 },
  { id: "3", name: "Nồi nấu phở", slug: "noi-nau-pho", image: "https://dienmaynewsun.com/wp-content/uploads/2023/05/may-thai-thit.jpg", parentId: "1", level: 2 },
  { id: "4", name: "Tủ nấu cơm", slug: "tu-nau-com", image: "https://dienmaynewsun.com/wp-content/uploads/2023/05/may-thai-thit.jpg", parentId: "1", level: 2 },
  { id: "5", name: "Máy thái thịt", slug: "may-thai-thit", image: "https://dienmaynewsun.com/wp-content/uploads/2023/05/may-thai-thit.jpg", parentId: "2", level: 2 },
  { id: "6", name: "Máy xay giò chả", slug: "may-xay-gio-cha", image: "https://dienmaynewsun.com/wp-content/uploads/2023/05/may-thai-thit.jpg", parentId: "2", level: 2 },
  { id: "7", name: "Nồi điện 20L", slug: "noi-dien-20l", image: "https://dienmaynewsun.com/wp-content/uploads/2023/05/may-thai-thit.jpg", parentId: "3", level: 3 },
  { id: "8", name: "Nồi điện 50L", slug: "noi-dien-50l", image: "https://dienmaynewsun.com/wp-content/uploads/2023/05/may-thai-thit.jpg", parentId: "3", level: 3 },
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
    pathMainImage: "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg",
    images: ["https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg?1", "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg?2", "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg?3", "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg?4", "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg?5"],
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
    featuresImage: "https://dienmaynewsun.com/wp-content/uploads/2023/04/lu-quay-80cm-than-1.jpg",
    models: ["20L", "30L", "50L", "80L", "100L", "120L"],
    sections: [
        { id: 'sec1', title: 'Thiết kế tối ưu, chất liệu cao cấp', description: 'Lò quay gà vịt bằng than 80 được thiết kế tối ưu với các bộ phận có thể tháo rời, giúp việc di chuyển và vệ sinh trở nên dễ dàng hơn. Toàn bộ lò được làm từ inox cao cấp, chống gỉ sét, đảm bảo an toàn vệ sinh thực phẩm và có độ bền cao.', pathImage: 'https://placehold.co/800x450.png', displayOrder: 1, positionImage: 'center' },
        { id: 'sec2', title: 'Năng suất cao, tiết kiệm thời gian', description: 'Với thiết kế lồng quay lớn, lò có thể quay từ 6-8 con gà/vịt cùng lúc, đáp ứng nhu cầu của các quán ăn, nhà hàng. Thời gian quay nhanh chóng, chỉ từ 45-60 phút/mẻ, giúp tiết kiệm thời gian và công sức.', pathImage: 'https://placehold.co/800x450.png', displayOrder: 2, positionImage: 'center' }
    ]
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
    pathMainImage: "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg",
    images: ["https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg", "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg"],
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
    featuresImage: "https://dienmaynewsun.com/wp-content/uploads/2023/04/lu-quay-80cm-than-1.jpg"
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
    pathMainImage: "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg",
    images: ["https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg"],
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
    featuresImage: "https://dienmaynewsun.com/wp-content/uploads/2023/04/lu-quay-80cm-than-1.jpg"
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
    pathMainImage: "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg",
    images: ["https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg"],
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
    featuresImage: "https://dienmaynewsun.com/wp-content/uploads/2023/04/lu-quay-80cm-than-1.jpg"
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
    pathMainImage: "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg",
    images: ["https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg"],
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
    featuresImage: "https://dienmaynewsun.com/wp-content/uploads/2023/04/lu-quay-80cm-than-1.jpg",
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
    pathMainImage: "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg",
    images: ["https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg"],
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
    pathMainImage: "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg",
    images: ["https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg"],
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
    featuresImage:"https://dienmaynewsun.com/wp-content/uploads/2023/04/lu-quay-80cm-than-1.jpg"
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
    pathMainImage: "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg",
    images: ["https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg", "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg"],
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
    productCode: "MXGC-5KG",
    
  }
];

export const apiProducts: Omit<ApiProductType, 'listProduct'> & { listProduct: ApiProduct[] }[] = [
  {
    id: 'cat_type_1',
    categoryTypeCode: 'noi-nau-pho',
    categoryTypeName: 'Nồi nấu phở',
    listProduct: [
      {
        id: "1",
        typeCode: "noi-nau-pho",
        typeName: "Nồi nấu phở",
        productName: "Nồi nấu phở bằng điện 20L",
        pathMainImage: "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg",
        productCode: "NNP-D20L",
        rawPrice: 3500000,
        salePrice: 2500000,
        starRating: 5,
        quantity: 100,
        purchaseCount: 548,
        isSale: true,
        listProductSection: [
            { id: 'sec1-1', title: 'Thiết kế tối ưu, chất liệu cao cấp', description: 'Lò quay gà vịt bằng than 80 được thiết kế tối ưu với các bộ phận có thể tháo rời, giúp việc di chuyển và vệ sinh trở nên dễ dàng hơn. Toàn bộ lò được làm từ inox cao cấp, chống gỉ sét, đảm bảo an toàn vệ sinh thực phẩm và có độ bền cao.', pathImage: 'https://placehold.co/800x450.png', displayOrder: 1, positionImage: 'center' },
            { id: 'sec1-2', title: 'Năng suất cao, tiết kiệm thời gian', description: 'Với thiết kế lồng quay lớn, lò có thể quay từ 6-8 con gà/vịt cùng lúc, đáp ứng nhu cầu của các quán ăn, nhà hàng. Thời gian quay nhanh chóng, chỉ từ 45-60 phút/mẻ, giúp tiết kiệm thời gian và công sức.', pathImage: 'https://placehold.co/800x450.png', displayOrder: 2, positionImage: 'center' }
        ],
        lisProductSubImage: [
          {id: 'sub1', pathImage: "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg?1"},
          {id: 'sub2', pathImage: "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg?2"}
        ],
        listProductProperties: [
          {name: "Dung tích", value: "20 Lít"},
          {name: "Chất liệu", value: "Inox 304"}
        ]
      }
    ]
  },
  {
    id: 'cat_type_2',
    categoryTypeCode: 'may-xay-gio-cha',
    categoryTypeName: 'Máy xay giò chả',
    listProduct: [
       {
        id: "2",
        typeCode: "may-xay-gio-cha",
        typeName: "Máy xay giò chả",
        productName: "Máy xay giò chả 3 kg/mẻ",
        pathMainImage: "https://dienmaynewsun.com/wp-content/uploads/2024/01/may-hut-chan-khong-sat-da-hvt-320ts-ava.jpg",
        productCode: "MXGC-3KG",
        rawPrice: 10500000,
        salePrice: 7500000,
        starRating: 5,
        quantity: 50,
        purchaseCount: 6220,
        isSale: true,
        listProductSection: [],
        lisProductSubImage: [],
        listProductProperties: [
          {name: "Năng suất", value: "3 KG/mẻ"},
          {name: "Công suất motor", value: "3 kW (4HP)"}
        ]
      }
    ]
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
        href: '/products?category=thiet-bi-bep',
        children: [
            {
                title: 'Nồi nấu phở',
                href: '/products?category=noi-nau-pho',
                children: [
                    { title: 'Bộ nồi nấu phở bằng điện', href: '/products/noi-nau-pho-dien-20l' },
                    { title: 'Nồi nấu phở điện Việt Nam', href: '/products/noi-nau-pho-dien-20l' },
                    { title: 'Nồi nấu phở điện nhập khẩu', href: '/products/noi-nau-pho-dien-20l' },
                    { title: 'Phụ kiện nồi nấu phở', href: '/products?category=phu-kien-noi-nau-pho' },
                ]
            },
            {
                title: 'Tủ nấu cơm công nghiệp',
                href: '/products?category=tu-nau-com',
                children: [
                    { title: 'Tủ nấu cơm bằng điện', href: '/products?category=tu-nau-com-dien' },
                    { title: 'Tủ nấu cơm bằng gas', href: '/products?category=tu-nau-com-gas' },
                    { title: 'Tủ nấu cơm bằng điện và gas', href: '/products?category=tu-nau-com-dien-gas' },
                    { title: 'Phụ kiện tủ nấu cơm', href: '/products?category=phu-kien-tu-nau-com' },
                ]
            },
        ]
    },
    {
        title: 'Máy chế biến thực phẩm',
        href: '/products?category=may-che-bien',
        children: [
            {
                title: 'Máy thái rau củ quả',
                href: '/products?category=may-thai-rau-cu-qua',
                children: [
                    { title: 'Máy thái rau củ quả đa năng', href: '/products?category=may-thai-rau-cu-qua-da-nang' },
                    { title: 'Máy thái lát củ quả', href: '/products?category=may-thai-lat-cu-qua' },
                ]
            },
             {
                title: 'Bếp chiên điện',
                href: '/products?category=bep-chien-dien',
                children: [
                    { title: 'Bếp chiên công nghiệp', href: '/products?category=bep-chien-cong-nghiep' },
                    { title: 'Bếp chiên tách dầu', href: '/products?category=bep-chien-tach-dau' },
                ]
            },
        ]
    },
     {
        title: 'Máy chế biến thịt',
        href: '/products?category=may-che-bien-thit',
        children: [
             {
                title: 'Máy thái thịt',
                href: '/products?category=may-thai-thit',
                children: [
                    { title: 'Máy thái thịt tươi sống', href: '/products/may-thai-thit-tuoi-song-mini-ss-90' },
                    { title: 'Máy thái thịt đông lạnh', href: '/products?category=may-thai-thit-dong-lanh' },
                ]
            },
            {
                title: 'Máy xay giò chả',
                href: '/products?category=may-xay-gio-cha',
                children: [
                    { title: 'Máy xay giò chả gia đình', href: '/products/may-xay-gio-cha-3kg' },
                    { title: 'Máy xay giò chả công nghiệp', href: '/products/may-xay-gio-cha-5kg' },
                ]
            }
        ]
    },
    {
        title: 'Thiết bị làm bánh',
        href: '/products?category=thiet-bi-lam-banh',
        children: []
    }
]

export const apiCategories: ApiCategory[] = [
    {
      id: "cat_1",
      categoryCode: "thiet-bi-bep",
      categoryName: "Thiết bị bếp nhà hàng",
      description: "Các thiết bị cho bếp nhà hàng",
      listCategoryType: [
        {
          id: "cat_type_1",
          categoryTypeCode: "noi-nau-pho",
          categoryTypeName: "Nồi nấu phở",
          listProductType: [
            {
              id: "prod_type_1",
              productTypeCode: "noi-nau-pho-dien",
              productTypeName: "Nồi nấu phở điện",
              description: "Các loại nồi nấu phở bằng điện",
              listProduct: [
                { id: "prod_1", productName: "Nồi nấu phở 20L", typeCode: 'noi-nau-pho-dien-20l' } as any,
                { id: "prod_2", productName: "Nồi nấu phở 50L", typeCode: 'noi-nau-pho-dien-50l' } as any,
              ]
            }
          ]
        },
        {
          id: "cat_type_2",
          categoryTypeCode: "tu-nau-com",
          categoryTypeName: "Tủ nấu cơm công nghiệp",
          listProductType: []
        }
      ]
    },
    {
      id: "cat_2",
      categoryCode: "may-che-bien-thit",
      categoryName: "Máy chế biến thịt",
      description: "Các loại máy chế biến thịt",
      listCategoryType: [
        {
          id: "cat_type_3",
          categoryTypeCode: "may-thai-thit",
          categoryTypeName: "Máy thái thịt",
          listProductType: []
        },
        {
          id: "cat_type_4",
          categoryTypeCode: "may-xay-gio-cha",
          categoryTypeName: "Máy xay giò chả",
          listProductType: []
        }
      ]
    }
  ];

export const heroBanners: Banner[] = [
  {
    src: "https://dienmaynewsun.com/wp-content/uploads/2025/01/banner-tet-may-vat-long.jpg",
    alt: "Banner 1",
    aiHint: "kitchen equipment",
  },
  {
    src: "https://dienmaynewsun.com/wp-content/uploads/2025/01/banner-tet-may-vat-long.jpg",
    alt: "Banner 2",
    aiHint: "food processing",
  },
  {
    src: "https://dienmaynewsun.com/wp-content/uploads/2025/01/banner-tet-may-vat-long.jpg",
    alt: "Banner 3",
    aiHint: "industrial appliances",
  },
];
