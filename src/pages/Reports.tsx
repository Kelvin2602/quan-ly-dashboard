
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ReportChart from '@/components/reports/ReportChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Reports() {
  // Sample data for reports
  const monthlySales = [
    { name: 'T1', revenue: 98000000 },
    { name: 'T2', revenue: 89000000 },
    { name: 'T3', revenue: 102000000 },
    { name: 'T4', revenue: 94000000 },
    { name: 'T5', revenue: 108000000 },
    { name: 'T6', revenue: 115000000 },
    { name: 'T7', revenue: 120000000 },
    { name: 'T8', revenue: 125000000 },
    { name: 'T9', revenue: 130000000 },
    { name: 'T10', revenue: 128000000 },
    { name: 'T11', revenue: 135000000 },
    { name: 'T12', revenue: 150000000 },
  ];
  
  const categorySales = [
    { name: 'Điện thoại', value: 42 },
    { name: 'Laptop', value: 28 },
    { name: 'Máy tính bảng', value: 15 },
    { name: 'Phụ kiện', value: 10 },
    { name: 'Màn hình', value: 5 },
  ];
  
  const orderStatus = [
    { name: 'Chờ xử lý', count: 32 },
    { name: 'Đang giao', count: 48 },
    { name: 'Đã giao', count: 124 },
    { name: 'Đã hủy', count: 12 },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Báo cáo</h1>
        
        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sales">Doanh thu</TabsTrigger>
            <TabsTrigger value="products">Sản phẩm</TabsTrigger>
            <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="animate-fade-in">
            <div className="grid grid-cols-1 gap-4">
              <ReportChart 
                type="bar" 
                title="Doanh thu theo tháng" 
                data={monthlySales} 
                dataKey="revenue" 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ReportChart 
                type="pie" 
                title="Doanh thu theo danh mục" 
                data={categorySales} 
                dataKey="value" 
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin sản phẩm</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Tổng số sản phẩm</span>
                      <span className="font-bold">182</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Sản phẩm hết hàng</span>
                      <span className="font-bold text-red-500">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Sản phẩm sắp hết hàng</span>
                      <span className="font-bold text-yellow-500">15</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Sản phẩm mới thêm (30 ngày)</span>
                      <span className="font-bold text-green-500">24</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="orders" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ReportChart 
                type="pie" 
                title="Trạng thái đơn hàng" 
                data={orderStatus} 
                dataKey="count" 
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin đơn hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Tổng số đơn hàng</span>
                      <span className="font-bold">254</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Giá trị trung bình/đơn</span>
                      <span className="font-bold">4,860,000 ₫</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Đơn hàng hôm nay</span>
                      <span className="font-bold text-green-500">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Tỉ lệ đơn hủy</span>
                      <span className="font-bold text-red-500">4.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
