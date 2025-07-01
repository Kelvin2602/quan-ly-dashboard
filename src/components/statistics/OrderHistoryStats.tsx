import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download, Search } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

// Sample data for demonstration
const orderHistoryData = [
  { id: 'ORD001', date: '2023-05-15', customer: 'Nguyễn Văn A', total: '1,250,000 ₫', status: 'Đã giao' },
  { id: 'ORD002', date: '2023-05-16', customer: 'Trần Thị B', total: '750,000 ₫', status: 'Đang xử lý' },
  { id: 'ORD003', date: '2023-05-16', customer: 'Lê Văn C', total: '2,100,000 ₫', status: 'Đã giao' },
  { id: 'ORD004', date: '2023-05-17', customer: 'Phạm Thị D', total: '850,000 ₫', status: 'Đang vận chuyển' },
  { id: 'ORD005', date: '2023-05-18', customer: 'Hoàng Văn E', total: '3,200,000 ₫', status: 'Đang xử lý' },
  { id: 'ORD006', date: '2023-05-19', customer: 'Ngô Thị F', total: '1,800,000 ₫', status: 'Đã hủy' },
  { id: 'ORD007', date: '2023-05-20', customer: 'Đỗ Văn G', total: '950,000 ₫', status: 'Đã giao' },
  { id: 'ORD008', date: '2023-05-21', customer: 'Bùi Thị H', total: '1,500,000 ₫', status: 'Đang vận chuyển' },
];

export default function OrderHistoryStats() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  // Filter orders based on search query and status filter
  const filteredOrders = orderHistoryData.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Function to export data to Excel
  const exportToExcel = () => {
    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredOrders);
    
    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lịch sử đơn hàng');
    
    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Create a download link and trigger click
    const fileName = `lich-su-don-hang-${new Date().toISOString().split('T')[0]}.xlsx`;
    
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    // Clean-up: revoke the object URL & remove the temporary link element to
    // avoid accumulating detached DOM nodes and in-memory blobs on every export.
    window.URL.revokeObjectURL(url);
    link.remove();
    
    // Show success notification
    toast({
      title: "Xuất báo cáo thành công",
      description: `Đã xuất ${filteredOrders.length} đơn hàng ra file Excel.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
            <div className="flex-1 flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo mã đơn hàng hoặc khách hàng..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
                  <SelectItem value="Đang vận chuyển">Đang vận chuyển</SelectItem>
                  <SelectItem value="Đã giao">Đã giao</SelectItem>
                  <SelectItem value="Đã hủy">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Chọn ngày...</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Button onClick={exportToExcel}>
              <Download className="mr-2 h-4 w-4" />
              Xuất báo cáo Excel
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="w-[100px]">Chi tiết</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        order.status === 'Đã giao' ? 'bg-green-100 text-green-800' :
                        order.status === 'Đang xử lý' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Đang vận chuyển' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Xem</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
