import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.slug}`}>
          <div className="aspect-square relative w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint="kitchen appliance"
            />
          </div>
        </Link>
        {product.originalPrice && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            SALE
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-base leading-snug h-12 line-clamp-2">
          <Link
            href={`/products/${product.slug}`}
            className="hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 pt-0">
        <div className="mb-4">
          <span className="text-primary font-bold text-lg">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through ml-2 text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <Button className="w-full" asChild>
          <Link href={`/products/${product.slug}`}>Mua ngay</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
