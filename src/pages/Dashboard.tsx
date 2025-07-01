import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import SalesChart from '@/components/dashboard/SalesChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  // Sample data for top products
  const topProducts = [
    { name: 'iPhone 13', sales: 42 },
    { name: 'Samsung Galaxy S22', sales: 38 },
    { name: 'Laptop Dell XPS 13', sales: 27 },
    { name: 'AirPods Pro', sales: 21 },
    { name: 'iPad Air', sales: 19 },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Bảng điều khiển</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            type="revenue" 
            value="1,234,560,000 ₫" 
            label="Tổng doanh thu" 
            change={{ value: "12%", positive: true }}
          />
          <StatsCard 
            type="orders" 
            value="254" 
            label="Đơn hàng" 
            change={{ value: "8%", positive: true }}
          />
          <StatsCard 
            type="products" 
            value="182" 
            label="Sản phẩm" 
            change={{ value: "5%", positive: true }}
          />
          <StatsCard 
            type="users" 
            value="2,137" 
            label="Người dùng" 
            change={{ value: "18%", positive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Sản phẩm bán chạy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 text-muted-foreground">{index + 1}.</div>
                      <div>{product.name}</div>
                    </div>
                    <div className="font-medium">{product.sales}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
