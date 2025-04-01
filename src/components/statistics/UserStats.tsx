
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer } from '@/components/ui/chart';
import { ArrowUpRight, Users } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data for demonstration
const newUsersData = [
  { month: 'T1', users: 120 },
  { month: 'T2', users: 150 },
  { month: 'T3', users: 180 },
  { month: 'T4', users: 210 },
  { month: 'T5', users: 250 },
  { month: 'T6', users: 290 },
  { month: 'T7', users: 320 },
  { month: 'T8', users: 340 },
  { month: 'T9', users: 380 },
  { month: 'T10', users: 420 },
  { month: 'T11', users: 470 },
  { month: 'T12', users: 520 },
];

const userActivityData = [
  { name: 'Đăng ký mới', value: 25 },
  { name: 'Hoạt động thường xuyên', value: 45 },
  { name: 'Hoạt động không thường xuyên', value: 20 },
  { name: 'Không hoạt động', value: 10 },
];

const topCustomersData = [
  { name: 'Nguyễn Văn A', orders: 12, totalSpent: 45000000, lastOrder: '2023-05-15' },
  { name: 'Trần Thị B', orders: 10, totalSpent: 38000000, lastOrder: '2023-05-18' },
  { name: 'Lê Văn C', orders: 8, totalSpent: 32000000, lastOrder: '2023-05-10' },
  { name: 'Phạm Thị D', orders: 7, totalSpent: 29000000, lastOrder: '2023-05-12' },
  { name: 'Hoàng Văn E', orders: 6, totalSpent: 25000000, lastOrder: '2023-05-20' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function UserStats() {
  const [timeRange, setTimeRange] = useState('year');
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng số người dùng
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,137</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                +18% <ArrowUpRight className="h-4 w-4 ml-1" />
              </span> so với kỳ trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Người dùng mới trong tháng
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                +12% <ArrowUpRight className="h-4 w-4 ml-1" />
              </span> so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Tăng trưởng người dùng</CardTitle>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quarter">Quý này</SelectItem>
                  <SelectItem value="year">Năm nay</SelectItem>
                  <SelectItem value="all">Tất cả</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardDescription>
              Số lượng người dùng mới theo tháng
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer
              config={{
                users: { color: "#8b5cf6" }
              }}
              className="aspect-auto h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={newUsersData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} người dùng`, "Số lượng"]} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#8b5cf6" 
                    name="Người dùng mới"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Phân loại người dùng</CardTitle>
            <CardDescription>
              Theo mức độ hoạt động
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { color: "#8b5cf6" }
              }}
              className="aspect-auto h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userActivityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userActivityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Tỷ lệ"]} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Khách hàng thân thiết</CardTitle>
          <CardDescription>
            Top 5 khách hàng có giá trị đơn hàng cao nhất
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead className="text-right">Số đơn hàng</TableHead>
                <TableHead className="text-right">Tổng chi tiêu</TableHead>
                <TableHead className="text-right">Đơn hàng gần nhất</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCustomersData.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell className="text-right">{customer.orders}</TableCell>
                  <TableCell className="text-right">{formatCurrency(customer.totalSpent)}</TableCell>
                  <TableCell className="text-right">{customer.lastOrder}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
