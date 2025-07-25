
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/services/api";
import { ProductDetailView } from "@/components/product-detail-view";

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter(p => p.typeCode === product.typeCode && p.id !== product.id).slice(0, 4);

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
}
