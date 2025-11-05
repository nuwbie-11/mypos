'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/app/api/products/route';
import { Plus, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <span className="text-sm bg-secondary px-2 py-1 rounded">{product.unitOfMeasure}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Package className="w-3 h-3 mr-1" />
          <span>In Stock: {product.stock}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          onClick={() => onAddToCart(product)}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}