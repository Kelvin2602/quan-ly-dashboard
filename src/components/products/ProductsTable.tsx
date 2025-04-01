
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Plus, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import ProductForm from './ProductForm';

// Sample product data
const sampleProducts = [
  { id: '1', name: 'Điện thoại iPhone 13', price: '24,990,000 đ', category: 'Điện thoại', stock: 25 },
  { id: '2', name: 'Laptop Dell XPS 13', price: '32,490,000 đ', category: 'Laptop', stock: 12 },
  { id: '3', name: 'Tai nghe AirPods Pro', price: '4,990,000 đ', category: 'Phụ kiện', stock: 50 },
  { id: '4', name: 'Samsung Galaxy S22', price: '19,990,000 đ', category: 'Điện thoại', stock: 18 },
  { id: '5', name: 'iPad Air', price: '15,990,000 đ', category: 'Máy tính bảng', stock: 15 },
  { id: '6', name: 'Bàn phím Logitech', price: '1,290,000 đ', category: 'Phụ kiện', stock: 30 },
  { id: '7', name: 'Macbook Pro M2', price: '35,990,000 đ', category: 'Laptop', stock: 8 },
  { id: '8', name: 'Màn hình LG 27"', price: '7,490,000 đ', category: 'Màn hình', stock: 10 },
];

export default function ProductsTable() {
  const [products, setProducts] = useState(sampleProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const { toast } = useToast();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (product: any) => {
    setCurrentProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Sản phẩm đã được xóa",
      description: "Sản phẩm đã được xóa thành công.",
      variant: "default",
    });
  };

  const handleSave = (product: any) => {
    if (currentProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === currentProduct.id ? { ...product, id: currentProduct.id } : p
      ));
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin sản phẩm đã được cập nhật.",
        variant: "default",
      });
    } else {
      // Add new product
      setProducts([...products, { ...product, id: (products.length + 1).toString() }]);
      toast({
        title: "Thêm thành công",
        description: "Sản phẩm mới đã được thêm vào danh sách.",
        variant: "default",
      });
    }
    setIsFormOpen(false);
    setCurrentProduct(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 w-1/3">
          <Input 
            placeholder="Tìm kiếm sản phẩm..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-focus"
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-2">
                <span className="mr-1">Danh mục</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSearchQuery('')}>
                Tất cả
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery('Điện thoại')}>
                Điện thoại
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery('Laptop')}>
                Laptop
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery('Phụ kiện')}>
                Phụ kiện
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Button 
          className="hover-scale"
          onClick={() => {
            setCurrentProduct(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
        </Button>
      </div>

      <div className="rounded-md border bg-white animate-fade-in overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Kho</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="table-row-hover">
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Không tìm thấy sản phẩm nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <ProductForm 
          product={currentProduct} 
          onSave={handleSave} 
          onCancel={() => {
            setIsFormOpen(false);
            setCurrentProduct(null);
          }}
        />
      </Dialog>
    </div>
  );
}
