
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trang Phân tích</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Đây là nơi hiển thị các biểu đồ và phân tích chi tiết về doanh thu,
            lưu lượng truy cập, và hành vi người dùng.
          </p>
          <div className="mt-4 p-8 border rounded-lg bg-gray-50 flex items-center justify-center h-64">
             <span className="text-gray-500">Biểu đồ sẽ được hiển thị ở đây</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
