
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data
const data = [
  { name: 'T1', sales: 4000 },
  { name: 'T2', sales: 3000 },
  { name: 'T3', sales: 5000 },
  { name: 'T4', sales: 2780 },
  { name: 'T5', sales: 1890 },
  { name: 'T6', sales: 2390 },
  { name: 'T7', sales: 3490 },
  { name: 'T8', sales: 4000 },
  { name: 'T9', sales: 3000 },
  { name: 'T10', sales: 5000 },
  { name: 'T11', sales: 2780 },
  { name: 'T12', sales: 3890 },
];

export default function SalesChart() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-0">
        <CardTitle>Tổng doanh thu</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorSales)" 
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
