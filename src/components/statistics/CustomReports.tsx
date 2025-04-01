
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CalendarIcon, Download, FileText, BarChart3, PieChart as PieChartIcon, LineChartIcon } from 'lucide-react';
import { format } from 'date-fns';

// Sample data for demonstration
const sampleReportData = [
  { name: 'Tháng 1', value: 120 },
  { name: 'Tháng 2', value: 150 },
  { name: 'Tháng 3', value: 180 },
  { name: 'Tháng 4', value: 210 },
  { name: 'Tháng 5', value: 250 },
  { name: 'Tháng 6', value: 290 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function CustomReports() {
  const [reportType, setReportType] = useState('sales');
  const [timeRange, setTimeRange] = useState('month');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [chartType, setChartType] = useState('bar');
  const [dataVisible, setDataVisible] = useState(false);
  
  const [selectedCategories, setSelectedCategories] = useState([
    { id: "phones", label: "Điện thoại", checked: true },
    { id: "laptops", label: "Laptop", checked: true },
    { id: "accessories", label: "Phụ kiện", checked: false },
    { id: "tablets", label: "Máy tính bảng", checked: false },
    { id: "watches", label: "Đồng hồ", checked: false },
  ]);
  
  const handleCategoryChange = (id: string, checked: boolean) => {
    setSelectedCategories(
      selectedCategories.map((category) => 
        category.id === id ? { ...category, checked } : category
      )
    );
  };
  
  const generateReport = () => {
    setDataVisible(true);
  };
  
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={sampleReportData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" name="Giá trị" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={sampleReportData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" name="Giá trị" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sampleReportData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {sampleReportData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Tạo báo cáo tùy chỉnh</CardTitle>
          <CardDescription>
            Tùy chỉnh các tiêu chí để tạo báo cáo theo nhu cầu của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="report-type">Loại báo cáo</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Chọn loại báo cáo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Báo cáo doanh thu</SelectItem>
                  <SelectItem value="products">Báo cáo sản phẩm</SelectItem>
                  <SelectItem value="users">Báo cáo người dùng</SelectItem>
                  <SelectItem value="orders">Báo cáo đơn hàng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time-range">Thời gian</Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger id="time-range">
                  <SelectValue placeholder="Chọn thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hôm nay</SelectItem>
                  <SelectItem value="week">Tuần này</SelectItem>
                  <SelectItem value="month">Tháng này</SelectItem>
                  <SelectItem value="quarter">Quý này</SelectItem>
                  <SelectItem value="year">Năm nay</SelectItem>
                  <SelectItem value="custom">Tùy chỉnh...</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {timeRange === 'custom' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="start-date">Từ ngày</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="start-date"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, 'dd/MM/yyyy') : <span>Chọn ngày...</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-date">Đến ngày</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="end-date"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, 'dd/MM/yyyy') : <span>Chọn ngày...</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-base">Danh mục sản phẩm</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                {selectedCategories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={category.id} 
                      checked={category.checked} 
                      onCheckedChange={(checked) => 
                        handleCategoryChange(category.id, checked === true)
                      }
                    />
                    <label
                      htmlFor={category.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="text-base">Loại biểu đồ</Label>
              <div className="flex space-x-4 mt-2">
                <Button 
                  variant={chartType === 'bar' ? "default" : "outline"} 
                  className="flex space-x-2"
                  onClick={() => setChartType('bar')}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Cột</span>
                </Button>
                <Button 
                  variant={chartType === 'line' ? "default" : "outline"} 
                  className="flex space-x-2"
                  onClick={() => setChartType('line')}
                >
                  <LineChartIcon className="h-4 w-4" />
                  <span>Đường</span>
                </Button>
                <Button 
                  variant={chartType === 'pie' ? "default" : "outline"} 
                  className="flex space-x-2"
                  onClick={() => setChartType('pie')}
                >
                  <PieChartIcon className="h-4 w-4" />
                  <span>Tròn</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Đặt lại</Button>
          <Button onClick={generateReport}>Tạo báo cáo</Button>
        </CardFooter>
      </Card>
      
      {dataVisible && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {reportType === 'sales' && 'Báo cáo doanh thu'}
                {reportType === 'products' && 'Báo cáo sản phẩm'}
                {reportType === 'users' && 'Báo cáo người dùng'}
                {reportType === 'orders' && 'Báo cáo đơn hàng'}
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>PDF</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Excel</span>
                </Button>
              </div>
            </div>
            <CardDescription>
              {timeRange === 'custom' && startDate && endDate
                ? `Dữ liệu từ ${format(startDate, 'dd/MM/yyyy')} đến ${format(endDate, 'dd/MM/yyyy')}`
                : timeRange === 'today'
                ? 'Dữ liệu của hôm nay'
                : timeRange === 'week'
                ? 'Dữ liệu trong tuần này'
                : timeRange === 'month'
                ? 'Dữ liệu trong tháng này'
                : timeRange === 'quarter'
                ? 'Dữ liệu trong quý này'
                : 'Dữ liệu trong năm nay'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { color: "#3b82f6" }
              }}
              className="aspect-auto h-96"
            >
              {renderChart()}
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
