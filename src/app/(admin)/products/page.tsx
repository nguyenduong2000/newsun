
import Image from "next/image"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { products } from "@/lib/mock-data"

const formatPrice = (price: number) => {
    if (price === 0) return "Liên hệ";
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};

export default function AdminProductsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sản phẩm</CardTitle>
        <CardDescription>
          Quản lý các sản phẩm của bạn.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Hình ảnh</span>
              </TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="hidden md:table-cell">
                Giá
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Số lượng bán
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Ngày tạo
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
                <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                        <Image
                        alt={product.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.image}
                        width="64"
                        data-ai-hint="kitchen appliance"
                        />
                    </TableCell>
                    <TableCell className="font-medium">
                        {product.name}
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">Còn hàng</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {formatPrice(product.price)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {product.sold || 25}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        2023-07-12 10:42 AM
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                            >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Sửa</DropdownMenuItem>
                            <DropdownMenuItem>Xóa</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{products.length}</strong>{" "}
          products
        </div>
      </CardFooter>
    </Card>
  )
}
