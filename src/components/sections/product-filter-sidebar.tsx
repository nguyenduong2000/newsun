
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

interface ProductFilterSidebarProps {
  categoryOptions: { value: string; label: string }[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  priceRange: [number, number];
  onPriceChange: (value: [number, number]) => void;
  isSale: boolean;
  onSaleChange: (checked: boolean) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  productCount: number;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

export function ProductFilterSidebar({
  categoryOptions,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  isSale,
  onSaleChange,
  searchTerm,
  onSearchChange,
  productCount,
}: ProductFilterSidebarProps) {
  return (
    <Card className="sticky top-24">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-xl">Bộ lọc</CardTitle>
        <Badge variant="secondary">{productCount} sản phẩm</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="search">Tìm kiếm</Label>
            <Input 
                autoFocus
                id="search"
                placeholder="Nhập tên sản phẩm..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Danh mục</Label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label>Khoảng giá</Label>
                <span className="text-sm font-medium text-primary">
                    {formatPrice(priceRange[0])}đ - {formatPrice(priceRange[1])}đ
                </span>
            </div>
            <Slider
                value={priceRange}
                onValueChange={onPriceChange}
                max={20000000}
                step={500000}
                minStepsBetweenThumbs={1}
            />
        </div> */}
        
        <div className="flex items-center justify-between">
            <Label htmlFor="sale-only">Chỉ hiển thị sản phẩm giảm giá</Label>
            <Switch
                id="sale-only"
                checked={isSale}
                onCheckedChange={onSaleChange}
            />
        </div>
      </CardContent>
    </Card>
  );
}
