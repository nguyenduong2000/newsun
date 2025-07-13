
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
import { Badge } from "@/components/ui/badge";

const consultations = [
    { id: 1, name: "Nguyễn Văn A", phone: "0987654321", message: "Tôi cần tư vấn về nồi nấu phở 50L.", status: "Mới", date: "2024-07-28" },
    { id: 2, name: "Trần Thị B", phone: "0912345678", message: "Báo giá cho tôi máy xay giò chả.", status: "Đã xử lý", date: "2024-07-27" },
    { id: 3, name: "Lê Văn C", phone: "0905123456", message: "Máy thái thịt SS-90 còn hàng không?", status: "Mới", date: "2024-07-28" },
]

export default function ConsultationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Yêu cầu Tư vấn</CardTitle>
        <CardDescription>
          Danh sách các yêu cầu tư vấn từ khách hàng.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Nội dung</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày gửi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell className="max-w-xs truncate">{item.message}</TableCell>
                <TableCell>
                  <Badge variant={item.status === 'Mới' ? 'destructive' : 'secondary'}>{item.status}</Badge>
                </TableCell>
                <TableCell>{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
