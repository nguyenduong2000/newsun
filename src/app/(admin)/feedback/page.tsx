
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

const feedbacks = [
    { id: 1, name: "Khách hàng ẩn danh", subject: "Góp ý về sản phẩm", message: "Nồi nấu phở nên có thêm lựa chọn dung tích nhỏ hơn.", status: "Đã đọc", date: "2024-07-25" },
    { id: 2, name: "Nguyễn Thị Mai", subject: "Khiếu nại", message: "Giao hàng chậm hơn so với dự kiến.", status: "Chưa đọc", date: "2024-07-28" },
    { id: 3, name: "Hoàng Văn Nam", subject: "Khen ngợi", message: "Nhân viên tư vấn rất nhiệt tình và chuyên nghiệp.", status: "Đã đọc", date: "2024-07-26" },
]

export default function FeedbackPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hòm thư Góp ý</CardTitle>
        <CardDescription>
          Danh sách các góp ý và khiếu nại từ khách hàng.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Người gửi</TableHead>
              <TableHead>Chủ đề</TableHead>
              <TableHead>Nội dung</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày gửi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell className="max-w-xs truncate">{item.message}</TableCell>
                <TableCell>
                  <Badge variant={item.status === 'Chưa đọc' ? 'destructive' : 'secondary'}>{item.status}</Badge>
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
