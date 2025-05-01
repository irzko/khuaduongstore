"use client";

import CartContext from "@/context/cart-context";
import { useEffect, useState } from "react";

export function CartProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [carts, setCarts] = useState<ICart[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as ICart[];
    if (cart.length !== 0) {
      const standardizedItems: ICart[] = cart
        .map((item) => {
          if (
            typeof item === "object" && // Phải là object
            item !== null && // Không phải là null
            "slug" in item && // Có thuộc tính 'slug'
            typeof (item as any).slug === "string" && // 'slug' là string
            "quantity" in item && // Có thuộc tính 'quantity'
            typeof (item as any).quantity === "number" // 'quantity' là number
          ) {
            return {
              slug: (item as any).slug,
              quantity: (item as any).quantity,
            };
          }
          return null;
        })
        .filter((item): item is ICart => item !== null); // Lọc bỏ các giá trị null (các item không hợp lệ)

      setCarts(standardizedItems);
    }
  }, []);

  return (
    <CartContext.Provider value={{ carts: carts, setCarts: setCarts }}>
      {children}
    </CartContext.Provider>
  );
}
