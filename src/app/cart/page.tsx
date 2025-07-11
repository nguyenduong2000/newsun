
'use client';

import { useCart } from '@/context/cart-context';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl text-center">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Giỏ hàng của bạn đang trống
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/products">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">
        Giỏ hàng của bạn
      </h1>

      <div className="grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="divide-y divide-border rounded-lg border">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center p-4">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                    data-ai-hint="kitchen appliance"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-foreground">
                      <h3>
                        <Link href={`/products/${item.slug}`}>{item.name}</Link>
                      </h3>
                      <p className="ml-4 whitespace-nowrap">{formatPrice(item.price * item.quantity)}đ</p>
                    </div>
                     <p className="mt-1 text-sm text-muted-foreground">
                        Đơn giá: {formatPrice(item.price)}đ
                      </p>
                  </div>
                  <div className="flex flex-1 items-center justify-between text-sm mt-4">
                     <div className="flex items-center border rounded-md">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                           <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                          className="h-8 w-12 border-0 text-center bg-transparent focus-visible:ring-0"
                          min={1}
                        />
                         <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                           <Plus className="h-4 w-4" />
                        </Button>
                     </div>
                     <div className="flex">
                      <Button variant="ghost" type="button" onClick={() => removeFromCart(item.id)}>
                         <Trash2 className="h-4 w-4 mr-1 text-muted-foreground" />
                         <span>Xóa</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
            <div className="mt-4">
                 <Button variant="outline" onClick={clearCart}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa tất cả giỏ hàng
                </Button>
            </div>
        </div>

        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <Card>
            <CardHeader>
                <CardTitle>Tổng kết đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex justify-between text-base font-medium text-foreground">
                <p>Tổng cộng</p>
                <p>{formatPrice(getCartTotal())}đ</p>
              </div>
               <p className="mt-0.5 text-sm text-muted-foreground">
                Phí vận chuyển và mã giảm giá sẽ được tính ở bước thanh toán.
              </p>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
                 <Button size="lg" className="w-full">
                    Tiến hành thanh toán
                </Button>
                 <Button variant="outline" className="w-full" asChild>
                    <Link href="/products">
                        Tiếp tục mua sắm
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

