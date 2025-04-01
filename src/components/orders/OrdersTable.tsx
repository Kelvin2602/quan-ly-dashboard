
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Dialog } from '@/components/ui/dialog';
import OrderDetails from './OrderDetails';
import { cn } from '@/lib/utils';

// Sample order data
const sampleOrders = [
  { 
    id: 'ORD-1234', 
    customer: 'Nguyễn Văn A', 
    date: '12/06/2023', 
    total: '2,990,000 đ', 
    status: 'pending',
    items: [
      { id: '1', name: 'Tai nghe AirPods Pro', price: '4,990,000 đ', quantity: 1 },
    ],
    address: '123 Đường Lê Lợi, Quận 1, TP. HCM',
  },
  { 
    id: 'ORD-1235', 
    customer: 'Trần Thị B', 
    date: '11/06/2023', 
    total: '24,990,000 đ', 
    status: 'shipped',
    items: [
      { id: '1', name: 'iPhone 13', price: '24,990,000 đ', quantity: 1 },
    ],
    address: '456 Đường Nguyễn Huệ, Quận 1, TP. HCM',
  },
  { 
    id: 'ORD-1236', 
    customer: 'Lê Văn C', 
    date: '10/06/2023', 
    total: '32,490,000 đ', 
    status: 'delivered',
    items: [
      { id: '2', name: 'Laptop Dell XPS 13', price: '32,490,000 đ', quantity: 1 },
    ],
    address: '789 Đường Cách Mạng Tháng 8, Quận 3, TP. HCM',
  },
  { 
    id: 'ORD-1237', 
    customer: 'Phạm Thị D', 
    date: '09/06/2023', 
    total: '19,990,000 đ', 
    status: 'cancelled',
    items: [
      { id: '4', name: 'Samsung Galaxy S22', price: '19,990,000 đ', quantity: 1 },
    ],
    address: '101 Đường Nguyễn Du, Quận 1, TP. HCM',
  },
  { 
    id: 'ORD-1238', 
    customer: 'Hoàng Văn E', 
    date: '08/06/2023', 
    total: '15,990,000 đ', 
    status: 'delivered',
    items: [
      { id: '5', name: 'iPad Air', price: '15,990,000 đ', quantity: 1 },
    ],
    address: '202 Đường Điện Biên Phủ, Quận 3, TP. HCM',
  },
];

export default function OrdersTable() {
  const [orders, setOrders] = useState(sampleOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Chờ xử lý</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-500">Đang giao</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Đã giao</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Đã hủy</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 w-1/3">
          <Input 
            placeholder="Tìm kiếm đơn hàng..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-focus"
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={cn(
                "ml-2",
                statusFilter !== 'all' && "border-primary text-primary"
              )}>
                <span className="mr-1">Trạng thái</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                Tất cả
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                Chờ xử lý
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('shipped')}>
                Đang giao
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('delivered')}>
                Đã giao
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('cancelled')}>
                Đã hủy
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border bg-white animate-fade-in overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn hàng</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className="table-row-hover">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewDetails(order)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  Không tìm thấy đơn hàng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        {selectedOrder && (
          <OrderDetails 
            order={selectedOrder} 
            onUpdateStatus={(status) => updateOrderStatus(selectedOrder.id, status)}
          />
        )}
      </Dialog>
    </div>
  );
}
