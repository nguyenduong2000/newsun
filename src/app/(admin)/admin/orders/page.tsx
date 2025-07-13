
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";

const orders = [
    { id: "ORD001", customer: "Nguyễn Văn A", date: "2024-07-28", total: "2,500,000đ", status: "Hoàn thành" },
    { id: "ORD002", customer: "Trần Thị B", date: "2024-07-27", total: "7,500,000đ", status: "Đang xử lý" },
    { id: "ORD003", customer: "Lê Văn C", date: "2024-07-26", total: "3,200,000đ", status: "Đã hủy" },
    { id: "ORD004", customer: "Phạm Thị D", date: "2024-07-25", total: "1,800,000đ", status: "Hoàn thành" },
    { id: "ORD005", customer: "Hoàng Văn E", date: "2024-07-24", total: "5,500,000đ", status: "Hoàn thành" },
    { id: "ORD006", customer: "Vũ Thị F", date: "2024-07-23", total: "9,000,000đ", status: "Đang xử lý" },
];

export default function OrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đơn hàng</CardTitle>
        <CardDescription>
          Quản lý tất cả các đơn hàng.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn hàng</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Tổng tiền</TableHead>
              <TableHead><span className="sr-only">Hành động</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      order.status === "Hoàn thành" ? "default" : 
                      order.status === "Đang xử lý" ? "secondary" : 
                      "destructive"
                    }
                    className={
                        order.status === "Hoàn thành" ? "bg-green-600" : ""
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
                 <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                      <DropdownMenuItem>Cập nhật trạng thái</DropdownMenuItem>
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
          Hiển thị <strong>1-6</strong> trên <strong>{orders.length}</strong> đơn hàng
        </div>
         <Pagination className="ml-auto">
            <PaginationContent>
                <PaginationItem>
                <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
