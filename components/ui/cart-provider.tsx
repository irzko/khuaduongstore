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
            typeof item === "object" &&
            item !== null &&
            "slug" in item &&
            typeof (item as ICart).slug === "string" &&
            "quantity" in item &&
            typeof (item as ICart).quantity === "number"
          ) {
            return {
              slug: (item as ICart).slug,
              quantity: (item as ICart).quantity,
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
