
import React from 'react';
import { BarChart3, Package, ShoppingCart, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatType = 'revenue' | 'orders' | 'products' | 'users';

interface StatsCardProps {
  type: StatType;
  value: string | number;
  label: string;
  change?: {
    value: string | number;
    positive: boolean;
  };
}

export default function StatsCard({ type, value, label, change }: StatsCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'revenue':
        return <BarChart3 className="h-6 w-6" />;
      case 'orders':
        return <ShoppingCart className="h-6 w-6" />;
      case 'products':
        return <Package className="h-6 w-6" />;
      case 'users':
        return <Users className="h-6 w-6" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'revenue':
        return 'bg-blue-50 text-blue-500';
      case 'orders':
        return 'bg-green-50 text-green-500';
      case 'products':
        return 'bg-purple-50 text-purple-500';
      case 'users':
        return 'bg-orange-50 text-orange-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-full", getColor())}>
          {getIcon()}
        </div>
        {change && (
          <div className={cn(
            "text-sm font-medium flex items-center",
            change.positive ? "text-green-500" : "text-red-500"
          )}>
            {change.positive ? '↑' : '↓'} {change.value}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </div>
  );
}
