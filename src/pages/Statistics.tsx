
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderHistoryStats from '@/components/statistics/OrderHistoryStats';
import RevenueStats from '@/components/statistics/RevenueStats';
import ProductStats from '@/components/statistics/ProductStats';
import UserStats from '@/components/statistics/UserStats';
import CustomReports from '@/components/statistics/CustomReports';

export default function Statistics() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Thống kê chi tiết</h1>
        
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="orders">Lịch sử đơn hàng</TabsTrigger>
            <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
            <TabsTrigger value="products">Sản phẩm</TabsTrigger>
            <TabsTrigger value="users">Người dùng</TabsTrigger>
            <TabsTrigger value="custom">Báo cáo tùy chỉnh</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="mt-6">
            <OrderHistoryStats />
          </TabsContent>
          
          <TabsContent value="revenue" className="mt-6">
            <RevenueStats />
          </TabsContent>
          
          <TabsContent value="products" className="mt-6">
            <ProductStats />
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <UserStats />
          </TabsContent>
          
          <TabsContent value="custom" className="mt-6">
            <CustomReports />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
