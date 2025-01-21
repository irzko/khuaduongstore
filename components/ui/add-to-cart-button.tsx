"use client";

import { useContext } from "react";
import { Button } from "./button";
import CartContext from "@/context/cart-context";
import { toaster } from "@/components/ui/toaster";

export default function AddToCartButton({ productId }: { productId: string }) {
  const { setCarts } = useContext(CartContext);
  const handleClick = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartObj = JSON.parse(cart);
      cartObj.push({
        id: productId,
        quantity: 1,
      });
      localStorage.setItem("cart", JSON.stringify(cartObj));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ id: productId, quantity: 1 }])
      );
    }
    setCarts((prev) => [...prev, { id: productId, quantity: 1 }]);
    toaster.create({
      title: "Thêm vào giỏ hàng thành công",
      type: "success",
    });
  };

  return (
    <Button variant="outline" onClick={handleClick} rounded="lg">
      Thêm vào giở hàng
    </Button>
  );
}
