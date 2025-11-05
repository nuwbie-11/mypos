"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "../types";

interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onCheckout: () => void;
  total: number;
}

export default function Cart({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
  total,
}: CartProps) {
  return (
    <Card className="h-full flex flex-col sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Cart ({items.length})</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Your cart is empty
          </p>
        ) : (
          <ScrollArea className="h-[300px] pr-2">
            {items.map((item) => (
              <div key={item.id} className="border-b py-3 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8 ml-2"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-right font-semibold mt-1">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex justify-between w-full font-bold text-lg">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Button
          className="w-full"
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
