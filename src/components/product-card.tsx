
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
import { Badge } from "./ui/badge";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

export function ProductCard({ product }: ProductCardProps) {
  const displayPrice = product.salePrice > 0 ? `${formatPrice(product.salePrice)}đ` : "Liên Hệ";
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({ ...product, price: product.salePrice }, 1);
    toast({
      title: "Thêm thành công",
      description: `"${product.productName}" đã được thêm vào giỏ hàng.`,
    });
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border rounded-lg bg-white group">
       <Link href={`/products/${product.slug}`} className="block overflow-hidden">
          <div className="aspect-square relative w-full bg-white p-2">
            <Image
              src={product.pathMainImage}
              alt={product.productName}
              fill
              className="object-contain transition-transform duration-300"
              data-ai-hint="kitchen appliance"
            />
             {product.isSale && (
              <Badge variant="destructive" className="absolute top-2 right-2 z-10">
                SALE
              </Badge>
            )}
          </div>
        </Link>
      <CardContent className="p-3 flex-grow">
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
      <CardFooter className="flex flex-col items-start p-3 pt-0">
        <div className="mb-2 w-full">
            <div className="text-sm text-muted-foreground">Giá: <span className="text-primary font-bold text-base">{displayPrice}</span></div>
            {product.rawPrice && product.salePrice > 0 && (
                <span className="text-muted-foreground line-through ml-2 text-xs">
                {formatPrice(product.rawPrice)}đ
                </span>
            )}
        </div>
        <Button size="sm" className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4"/> Thêm vào giỏ
        </Button>
      </CardFooter>
    </Card>
  );
}
