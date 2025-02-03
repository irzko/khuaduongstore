"use client";

import { useContext } from "react";
import { Button } from "./button";
import CartContext from "@/context/cart-context";
import { toaster } from "@/components/ui/toaster";
import { TbShoppingCartPlus } from "react-icons/tb";

export default function AddToCartButton({ productId }: { productId: string }) {
  const { setCarts } = useContext(CartContext);
  const handleClick = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartObj = JSON.parse(cart);
      const productIndex = cartObj.findIndex(
        (cart: { id: string }) => cart.id === productId
      );
      if (productIndex !== -1) {
        cartObj[productIndex].quantity += 1;
      } else {
        cartObj.push({ id: productId, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cartObj));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ id: productId, quantity: 1 }])
      );
    }
    setCarts(
      JSON.parse(localStorage.getItem("cart") || "[]").map(
        (cart: { id: string; quantity: number }) => ({
          id: cart.id,
          quantity: cart.quantity,
        })
      )
    );
    toaster.create({
      title: "Thêm vào giỏ hàng thành công",
      type: "success",
    });
  };

  return (
    <Button variant="outline" onClick={handleClick} rounded="lg">
      <TbShoppingCartPlus /> Thêm vào giở hàng
    </Button>
  );
}
