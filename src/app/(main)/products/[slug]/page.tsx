
import { notFound } from "next/navigation";
import { filterProducts, getProductBySlug, getProductModelBySlug, getProducts } from "@/services/api";
import { ProductDetailView } from "@/components/product-detail-view";
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug
 
  const product = await getProductBySlug(slug)
 
  if (!product) {
    return {
        title: "Sản phẩm không tồn tại",
        description: "Sản phẩm bạn tìm kiếm không có sẵn hoặc đã bị xóa."
    }
  }
  const previousImages = (await parent).openGraph?.images || []
  const [firstDescription] = product.listProductSection
  return {
    title: product.productName,
    description: firstDescription?.description?.substring(0, 160) || "", // Truncate for meta description
    openGraph: {
      title: product.productName,
      description: firstDescription?.description?.substring(0, 160)|| "",
      images: [
        {
          url: product.pathMainImage,
          width: 800,
          height: 600,
          alt: product.productName,
        },
        ...previousImages,
      ],
    },
  }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const product = await getProductBySlug(slug);
  const models = await getProductModelBySlug(slug);

  if (!product) {
    notFound();
  }
const firstFour = product?.productName.slice(0, 4);
  const allProducts = await filterProducts({categoryTypeCode:"",productName:firstFour});

  return <ProductDetailView product={product} relatedProducts={allProducts} models={models} slug={slug}/>;
}
