"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "./types";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import Cart from "./components/Cart";
import { Product } from "@/app/api/products/route";
import { useDebounce } from "@/hooks/use-debounce";

export default function PosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        if (selectedCategory) {
          params.append("category", selectedCategory);
        }

        if (debouncedSearch) {
          params.append("search", debouncedSearch);
        }

        const response = await fetch(`/api/products?${params.toString()}`);
        const data = await response.json();

        setProducts(data.products);
        setCategories(data.categories);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, debouncedSearch]);

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Add item to cart
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Update quantity if item is already in cart and stock allows
        const newQuantity = existingItem.quantity + 1;
        if (newQuantity <= product.stock) {
          return prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: newQuantity } : item
          );
        }
        return prevItems; // Don't add if stock limit reached
      } else {
        // Add new item to cart if stock available
        if (product.stock > 0) {
          return [
            ...prevItems,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              product: product,
            },
          ];
        }
        return prevItems; // Don't add if no stock
      }
    });
  };

  // Remove item from cart
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update item quantity
  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          // Make sure quantity doesn't exceed stock
          const maxQuantity = item.product.stock;
          const newQuantity = Math.min(quantity, maxQuantity);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Handle checkout
  const handleCheckout = () => {
    // In a real app, this would process the payment
    alert(`Checkout completed! Total: $${total.toFixed(2)}`);
    setCartItems([]); // Clear cart after checkout
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b p-4">
        <h1 className="text-2xl font-bold">Point of Sale</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* Left Panel - Products */}
        <div className="w-3/4 flex flex-col gap-4">
          {/* Search and Filters */}
          <Card className="p-4">
            <div className="flex flex-col gap-4">
              <div>
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>
              <div>
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                />
              </div>
            </div>
          </Card>

          {/* Product Grid */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p>Loading products...</p>
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Right Panel - Cart */}
        <div className="w-1/4 h-[calc(100vh-120px)] overflow-y-auto sticky top-4">
          <Cart
            items={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={handleCheckout}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
