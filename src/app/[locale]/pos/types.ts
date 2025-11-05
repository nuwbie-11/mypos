import { Product } from '@/app/api/products/route';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  product: Product;
}