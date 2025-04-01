
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function SettingsForm() {
  const [general, setGeneral] = useState({
    siteName: 'Quan Ly Shop',
    contactEmail: 'info@quanlyshop.com',
    phoneNumber: '+84 123 456 789',
  });

  const [currency, setCurrency] = useState({
    currencyCode: 'VND',
    currencySymbol: '₫',
    decimalPlaces: '0',
  });

  const [shipping, setShipping] = useState({
    enableFreeShipping: true,
    freeShippingThreshold: '500000',
    defaultShippingFee: '30000',
  });

  const { toast } = useToast();

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Cài đặt đã được lưu",
      description: "Thông tin chung đã được cập nhật thành công.",
      variant: "default",
    });
  };

  const handleCurrencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Cài đặt đã được lưu",
      description: "Cài đặt tiền tệ đã được cập nhật thành công.",
      variant: "default",
    });
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Cài đặt đã được lưu",
      description: "Cài đặt vận chuyển đã được cập nhật thành công.",
      variant: "default",
    });
  };

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList className="grid grid-cols-3 w-[400px]">
        <TabsTrigger value="general">Thông tin chung</TabsTrigger>
        <TabsTrigger value="currency">Tiền tệ</TabsTrigger>
        <TabsTrigger value="shipping">Vận chuyển</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin chung</CardTitle>
            <CardDescription>Quản lý thông tin cơ bản của website</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGeneralSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Tên website</Label>
                <Input
                  id="siteName"
                  value={general.siteName}
                  onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}
                  className="input-focus"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email liên hệ</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={general.contactEmail}
                  onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })}
                  className="input-focus"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                <Input
                  id="phoneNumber"
                  value={general.phoneNumber}
                  onChange={(e) => setGeneral({ ...general, phoneNumber: e.target.value })}
                  className="input-focus"
                />
              </div>
              
              <Button type="submit" className="hover-scale">Lưu thay đổi</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="currency" className="animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt tiền tệ</CardTitle>
            <CardDescription>Quản lý cài đặt tiền tệ cho website</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCurrencySubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currencyCode">Mã tiền tệ</Label>
                <Select 
                  value={currency.currencyCode} 
                  onValueChange={(value) => setCurrency({ ...currency, currencyCode: value })}
                >
                  <SelectTrigger id="currencyCode" className="input-focus">
                    <SelectValue placeholder="Chọn mã tiền tệ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VND">VND - Việt Nam Đồng</SelectItem>
                    <SelectItem value="USD">USD - Đô la Mỹ</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currencySymbol">Ký hiệu tiền tệ</Label>
                <Input
                  id="currencySymbol"
                  value={currency.currencySymbol}
                  onChange={(e) => setCurrency({ ...currency, currencySymbol: e.target.value })}
                  className="input-focus"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="decimalPlaces">Số chữ số thập phân</Label>
                <Input
                  id="decimalPlaces"
                  type="number"
                  min="0"
                  max="4"
                  value={currency.decimalPlaces}
                  onChange={(e) => setCurrency({ ...currency, decimalPlaces: e.target.value })}
                  className="input-focus"
                />
              </div>
              
              <Button type="submit" className="hover-scale">Lưu thay đổi</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="shipping" className="animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt vận chuyển</CardTitle>
            <CardDescription>Quản lý cài đặt phí vận chuyển</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enableFreeShipping" 
                  checked={shipping.enableFreeShipping} 
                  onCheckedChange={(checked) => setShipping({ ...shipping, enableFreeShipping: checked })} 
                />
                <Label htmlFor="enableFreeShipping">Bật miễn phí vận chuyển</Label>
              </div>
              
              {shipping.enableFreeShipping && (
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">Ngưỡng miễn phí vận chuyển (VNĐ)</Label>
                  <Input
                    id="freeShippingThreshold"
                    type="number"
                    min="0"
                    value={shipping.freeShippingThreshold}
                    onChange={(e) => setShipping({ ...shipping, freeShippingThreshold: e.target.value })}
                    className="input-focus"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="defaultShippingFee">Phí vận chuyển mặc định (VNĐ)</Label>
                <Input
                  id="defaultShippingFee"
                  type="number"
                  min="0"
                  value={shipping.defaultShippingFee}
                  onChange={(e) => setShipping({ ...shipping, defaultShippingFee: e.target.value })}
                  className="input-focus"
                />
              </div>
              
              <Button type="submit" className="hover-scale">Lưu thay đổi</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
