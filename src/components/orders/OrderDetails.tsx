
import React from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface OrderDetailsProps {
  order: any;
  onUpdateStatus: (status: string) => void;
}

export default function OrderDetails({ order, onUpdateStatus }: OrderDetailsProps) {
  const [status, setStatus] = React.useState(order.status);
  const { toast } = useToast();

  const getStatusLabel = (statusCode: string) => {
    switch (statusCode) {
      case 'pending': return 'Chờ xử lý';
      case 'shipped': return 'Đang giao';
      case 'delivered': return 'Đã giao';
      case 'cancelled': return 'Đã hủy';
      default: return statusCode;
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    onUpdateStatus(newStatus);
    toast({
      title: "Cập nhật trạng thái",
      description: `Đơn hàng ${order.id} đã được cập nhật thành "${getStatusLabel(newStatus)}"`,
      variant: "default",
    });
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between">
          <span>Chi tiết đơn hàng {order.id}</span>
          <Badge className={`
            ${status === 'pending' && 'bg-yellow-500'}
            ${status === 'shipped' && 'bg-blue-500'}
            ${status === 'delivered' && 'bg-green-500'}
            ${status === 'cancelled' && 'bg-red-500'}
          `}>
            {getStatusLabel(status)}
          </Badge>
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Khách hàng</h3>
            <p className="mt-1 text-sm">{order.customer}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Ngày đặt</h3>
            <p className="mt-1 text-sm">{order.date}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Địa chỉ giao hàng</h3>
          <p className="mt-1 text-sm">{order.address}</p>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-3">Sản phẩm</h3>
          <div className="space-y-3">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                </div>
                <p className="font-medium">{item.price}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 font-bold">
            <p>Tổng cộng</p>
            <p>{order.total}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Cập nhật trạng thái</h3>
          <div className="flex space-x-2">
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Chờ xử lý</SelectItem>
                <SelectItem value="shipped">Đang giao</SelectItem>
                <SelectItem value="delivered">Đã giao</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
