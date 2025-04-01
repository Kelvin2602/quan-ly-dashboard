
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProductsTable from '@/components/products/ProductsTable';

export default function Products() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <ProductsTable />
      </div>
    </MainLayout>
  );
}
