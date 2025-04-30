import CartContext from "@/context/cart-context";
import { Group, IconButton } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

export default function AdjustQuantity({ slug }: { slug: string }) {
  const { carts, setCarts } = useContext(CartContext);
  const inscreaseQuantity = () => {
    const newCarts = carts.map((cart) => {
      if (cart.slug === slug) {
        return { ...cart, quantity: cart.quantity + 1 };
      }
      return cart;
    });
    localStorage.setItem("cart", JSON.stringify(newCarts));
    setCarts(newCarts);
  };

  const decreaseQuantity = () => {
    const newCarts = carts.map((cart) => {
      if (cart.slug === slug) {
        if (cart.quantity > 1) {
          return { ...cart, quantity: cart.quantity - 1 };
        } else {
          return { ...cart };
        }
      }
      return cart;
    });
    localStorage.setItem("cart", JSON.stringify(newCarts));
    setCarts(newCarts);
  };

  return (
    <Group attached height="2.25rem">
      <IconButton
        h="full"
        rounded="lg"
        onClick={decreaseQuantity}
        variant="outline"
        size="sm"
      >
        <LuMinus />
      </IconButton>
      {/* <Input defaultValue={quantity} size="sm" /> */}
      <IconButton
        h="full"
        variant="outline"
        rounded="lg"
        onClick={inscreaseQuantity}
        size="sm"
      >
        <LuPlus />
      </IconButton>
    </Group>
  );
}
