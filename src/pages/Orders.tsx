
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import OrdersTable from '@/components/orders/OrdersTable';

export default function Orders() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        <OrdersTable />
      </div>
    </MainLayout>
  );
}
