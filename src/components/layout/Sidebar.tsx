
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PackageOpen, 
  Users, 
  BarChart3, 
  Settings,
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
  { name: 'Sản phẩm', path: '/products', icon: <PackageOpen className="h-5 w-5" /> },
  { name: 'Đơn hàng', path: '/orders', icon: <ShoppingBag className="h-5 w-5" /> },
  { name: 'Người dùng', path: '/users', icon: <Users className="h-5 w-5" /> },
  { name: 'Báo cáo', path: '/reports', icon: <BarChart3 className="h-5 w-5" /> },
  { name: 'Cài đặt', path: '/settings', icon: <Settings className="h-5 w-5" /> },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  return (
    <div className={cn(
      "bg-sidebar h-full flex flex-col text-sidebar-foreground relative transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center p-4 h-16">
        {!collapsed && (
          <h1 className="text-lg font-bold">Quan Ly Admin</h1>
        )}
      </div>
      
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white text-primary rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
      
      <nav className="flex-1 py-2">
        <ul className="px-2 space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent group",
                  location.pathname === item.path ? "bg-sidebar-accent" : "transparent"
                )}
              >
                <span className={cn("", location.pathname === item.path ? "text-white" : "text-white/80")}>{item.icon}</span>
                {!collapsed && (
                  <span className={cn(
                    "ml-3 transition-opacity",
                    location.pathname === item.path ? "font-medium" : "",
                  )}>
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4">
        {!collapsed && (
          <div className="text-xs text-sidebar-foreground/70">
            © 2023 Quan Ly Admin
          </div>
        )}
      </div>
    </div>
  );
}
