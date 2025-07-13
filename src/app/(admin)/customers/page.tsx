
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const customers = [
    { id: 'cus_1', name: 'Nguyễn Văn An', email: 'an.nv@example.com', totalOrders: 5, totalSpent: '15,000,000đ' },
    { id: 'cus_2', name: 'Trần Thị Bình', email: 'binh.tt@example.com', totalOrders: 2, totalSpent: '7,500,000đ' },
    { id: 'cus_3', name: 'Lê Văn Cường', email: 'cuong.lv@example.com', totalOrders: 8, totalSpent: '32,000,000đ' },
]

export default function CustomersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Khách hàng</CardTitle>
        <CardDescription>
          Danh sách khách hàng đã đăng ký và mua hàng.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên khách hàng</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tổng đơn hàng</TableHead>
              <TableHead>Tổng chi tiêu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.totalOrders}</TableCell>
                <TableCell>{customer.totalSpent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
