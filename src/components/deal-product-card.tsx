
'use client';

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

interface DealProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

export function DealProductCard({ product }: DealProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast({
      title: "Thêm thành công",
      description: `"${product.productName}" đã được thêm vào giỏ hàng.`,
    });
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl border rounded-lg">
       <Link href={`/products/${product.slug}`}>
          <div className="aspect-[4/3] relative w-full bg-white p-2">
            <Image
              src={product.featuresImage || product.pathMainImage}
              alt={product.productName}
              fill
              className="object-contain"
              data-ai-hint="kitchen appliance"
            />
          </div>
        </Link>
      <CardContent className="p-3 flex-grow bg-white">
        <h3 className="font-semibold text-sm leading-snug h-10 line-clamp-2">
          <Link
            href={`/products/${product.slug}`}
            className="hover:text-primary"
          >
            {product.productName}
          </Link>
        </h3>
        <div className="flex items-center mt-2 text-xs">
           {product.starRating && (
            <>
                <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < product.starRating! ? 'fill-current' : 'fill-gray-300'}`} />
                    ))}
                </div>
                <span className="text-muted-foreground ml-1">({product.reviews})</span>
            </>
           )}
           {product.purchaseCount && <span className="text-muted-foreground ml-2">{product.purchaseCount} <ShoppingCart className="inline h-3 w-3"/></span>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-3 pt-0 bg-white rounded-b-lg">
        <div className="mb-2 w-full">
          <span className="text-primary font-bold text-base">
            {formatPrice(product.salePrice)}đ
          </span>
          {product.rawPrice && product.rawPrice > 0 && product.salePrice > 0 && (
            <span className="text-muted-foreground line-through ml-2 text-xs">
              {formatPrice(product.rawPrice)}đ
            </span>
          )}
        </div>
        <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold" onClick={handleAddToCart}>
          Thêm vào giỏ
        </Button>
      </CardFooter>
    </Card>
  );
}
