
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UsersTable from '@/components/users/UsersTable';

export default function Users() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <UsersTable />
      </div>
    </MainLayout>
  );
}
