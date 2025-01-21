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
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCarts(JSON.parse(cart));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ carts: carts, setCarts: setCarts }}
    >
      {children}
    </CartContext.Provider>
  );
}
