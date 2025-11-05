import { NextRequest } from 'next/server';

// Define product types
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  unitOfMeasure: string;
  barcode: string;
  sku: string;
};

// Mock data for products
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Apple',
    description: 'Fresh red apples',
    price: 2.99,
    stock: 100,
    category: 'Fruits',
    unitOfMeasure: 'kg',
    barcode: '1234567890123',
    sku: 'FRUIT-APP-001'
  },
  {
    id: 2,
    name: 'Banana',
    description: 'Ripe yellow bananas',
    price: 1.49,
    stock: 150,
    category: 'Fruits',
    unitOfMeasure: 'kg',
    barcode: '1234567890124',
    sku: 'FRUIT-BAN-002'
  },
  {
    id: 3,
    name: 'White Bread',
    description: 'Freshly baked white bread',
    price: 3.99,
    stock: 50,
    category: 'Bakery',
    unitOfMeasure: 'loaf',
    barcode: '1234567890125',
    sku: 'BAK-LOAF-003'
  },
  {
    id: 4,
    name: 'Milk',
    description: 'Fresh whole milk',
    price: 4.50,
    stock: 80,
    category: 'Dairy',
    unitOfMeasure: 'liter',
    barcode: '1234567890126',
    sku: 'DAIRY-MILK-004'
  },
  {
    id: 5,
    name: 'Eggs',
    description: 'Free range eggs',
    price: 6.99,
    stock: 120,
    category: 'Dairy',
    unitOfMeasure: 'dozen',
    barcode: '1234567890127',
    sku: 'DAIRY-EGG-005'
  },
  {
    id: 6,
    name: 'Chicken Breast',
    description: 'Fresh chicken breast',
    price: 12.99,
    stock: 40,
    category: 'Meat',
    unitOfMeasure: 'kg',
    barcode: '1234567890128',
    sku: 'MEAT-CHK-006'
  },
  {
    id: 7,
    name: 'Rice',
    description: 'Long grain white rice',
    price: 8.99,
    stock: 200,
    category: 'Pantry',
    unitOfMeasure: 'kg',
    barcode: '1234567890129',
    sku: 'PAN-RICE-007'
  },
  {
    id: 8,
    name: 'Tomato',
    description: 'Fresh ripe tomatoes',
    price: 3.49,
    stock: 90,
    category: 'Vegetables',
    unitOfMeasure: 'kg',
    barcode: '1234567890130',
    sku: 'VEG-TOM-008'
  },
  {
    id: 9,
    name: 'Potato',
    description: 'Russet potatoes',
    price: 2.49,
    stock: 180,
    category: 'Vegetables',
    unitOfMeasure: 'kg',
    barcode: '1234567890131',
    sku: 'VEG-POT-009'
  },
  {
    id: 10,
    name: 'Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 5.99,
    stock: 35,
    category: 'Beverages',
    unitOfMeasure: 'liter',
    barcode: '1234567890132',
    sku: 'BEV-OJ-010'
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  let filteredProducts = mockProducts;

  // Filter by category if provided
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by search term if provided
  if (search) {
    filteredProducts = filteredProducts.filter(
      product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.barcode.includes(search) ||
        product.sku.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Add a delay to simulate network request
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return Response.json({
    products: filteredProducts,
    categories: Array.from(new Set(mockProducts.map(p => p.category))),
    total: filteredProducts.length,
  });
}