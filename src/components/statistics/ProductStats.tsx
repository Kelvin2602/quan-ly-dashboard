
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Package } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data for demonstration
const topSellingProducts = [
  { name: 'iPhone 13', sales: 42, revenue: 1344000000, stock: 15 },
  { name: 'Samsung Galaxy S22', sales: 38, revenue: 1140000000, stock: 12 },
  { name: 'Laptop Dell XPS 13', sales: 27, revenue: 1080000000, stock: 5 },
  { name: 'AirPods Pro', sales: 21, revenue: 126000000, stock: 8 },
  { name: 'iPad Air', sales: 19, revenue: 285000000, stock: 3 },
  { name: 'Apple Watch Series 7', sales: 16, revenue: 128000000, stock: 9 },
  { name: 'Xiaomi Mi 11', sales: 14, revenue: 280000000, stock: 11 },
  { name: 'Sony WH-1000XM4', sales: 13, revenue: 91000000, stock: 7 },
];

const categorySalesData = [
  { name: 'Điện thoại', value: 120 },
  { name: 'Laptop', value: 80 },
  { name: 'Phụ kiện', value: 65 },
  { name: 'Máy tính bảng', value: 45 },
  { name: 'Đồng hồ thông minh', value: 30 },
];

const inventoryStatusData = [
  { name: 'Còn hàng (>10)', value: 85 },
  { name: 'Sắp hết (5-10)', value: 32 },
  { name: 'Gần hết (<5)', value: 18 },
  { name: 'Hết hàng', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function ProductStats() {
  const [sortBy, setSortBy] = useState('sales');
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  // Sort products based on selected criteria
  const sortedProducts = [...topSellingProducts].sort((a, b) => {
    if (sortBy === 'sales') return b.sales - a.sales;
    if (sortBy === 'revenue') return b.revenue - a.revenue;
    if (sortBy === 'stock') return a.stock - b.stock;
    return 0;
  });

  // Products with low stock
  const lowStockProducts = topSellingProducts.filter(product => product.stock < 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {lowStockProducts.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Cảnh báo tồn kho</AlertTitle>
          <AlertDescription>
            Có {lowStockProducts.length} sản phẩm sắp hết hàng cần được nhập thêm.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sản phẩm bán chạy</CardTitle>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Số lượng bán</SelectItem>
                  <SelectItem value="revenue">Doanh thu</SelectItem>
                  <SelectItem value="stock">Tồn kho</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead className="text-right">Đã bán</TableHead>
                  <TableHead className="text-right">Doanh thu</TableHead>
                  <TableHead className="text-right">Tồn kho</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-right">{product.sales}</TableCell>
                    <TableCell className="text-right">{formatCurrency(product.revenue)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <span className={`mr-2 ${product.stock < 5 ? 'text-red-500' : product.stock < 10 ? 'text-yellow-500' : 'text-green-500'}`}>
                          {product.stock}
                        </span>
                        <Progress 
                          value={product.stock * 10} 
                          max={100} 
                          className="w-16 h-2"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Doanh số theo danh mục</CardTitle>
            <CardDescription>
              Phân bổ số lượng sản phẩm đã bán theo danh mục
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { color: "#10b981" }
              }}
              className="aspect-auto h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySalesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categorySalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} sản phẩm`, "Đã bán"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tình trạng tồn kho</CardTitle>
            <div className="flex items-center">
              <Package className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-lg font-semibold">182</span>
              <span className="ml-1 text-xs text-muted-foreground">sản phẩm</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: { color: "#3b82f6" }
            }}
            className="aspect-auto h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={inventoryStatusData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={100}
                />
                <Tooltip formatter={(value) => [`${value} sản phẩm`, "Số lượng"]} />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name="Số lượng" 
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
