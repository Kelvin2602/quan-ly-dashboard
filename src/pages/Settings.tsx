
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SettingsForm from '@/components/settings/SettingsForm';

export default function Settings() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Cài đặt hệ thống</h1>
        <SettingsForm />
      </div>
    </MainLayout>
  );
}
