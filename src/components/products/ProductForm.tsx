import React from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductFormProps {
  product?: any;
  onSave: (product: any) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [name, setName] = React.useState(product?.name || '');
  const [price, setPrice] = React.useState(product?.price?.replace(' đ', '') || '');
  const [category, setCategory] = React.useState(product?.category || '');
  const [stock, setStock] = React.useState(product?.stock?.toString() || '');
  const [description, setDescription] = React.useState(product?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ----- Data sanitisation -----
    // 1. Remove every non-digit character from the price string so we never
    //    end up with duplicated currency symbols or stray spaces/comma.
    const numericPrice = price.replace(/[^0-9]/g, "");
    // Fallback to 0 when the input is empty after stripping characters.
    const priceNumber = numericPrice ? Number(numericPrice) : 0;

    // Format price nicely with thousand separators and append the currency.
    const formattedPrice = `${priceNumber.toLocaleString()} đ`;

    // 2. Stock: make sure we store a non-negative integer. `Number` handles
    //    empty strings as 0, parseInt returns NaN – so we normalise through
    //    `Number`, then clamp to 0.
    let stockNumber = Number(stock);
    if (Number.isNaN(stockNumber) || stockNumber < 0) {
      stockNumber = 0;
    }

    onSave({
      name,
      price: formattedPrice,
      category,
      stock: stockNumber,
      description,
    });
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="space-y-2">
          <Label htmlFor="name">Tên sản phẩm</Label>
          <Input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-focus"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Giá</Label>
            <Input
              id="price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input-focus"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stock">Số lượng trong kho</Label>
            <Input
              id="stock"
              required
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="input-focus"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Danh mục</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger id="category" className="input-focus">
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Điện thoại">Điện thoại</SelectItem>
              <SelectItem value="Laptop">Laptop</SelectItem>
              <SelectItem value="Máy tính bảng">Máy tính bảng</SelectItem>
              <SelectItem value="Phụ kiện">Phụ kiện</SelectItem>
              <SelectItem value="Màn hình">Màn hình</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="input-focus"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Hủy bỏ
          </Button>
          <Button type="submit">
            {product ? 'Cập nhật' : 'Thêm sản phẩm'}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
