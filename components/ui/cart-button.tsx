"use client";

import CartContext from "@/context/cart-context";
import { Badge, Float, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { LuShoppingCart } from "react-icons/lu";

export default function CartButton() {
  const { carts } = useContext(CartContext);
  return (
    <IconButton variant="outline" rounded="lg" asChild>
      <Link href="/cart">
        <LuShoppingCart />
        <Float placement="top-end" offsetX="1" offsetY="1">
          <Badge colorPalette="red" rounded="full" variant="solid">
            {carts.length}
          </Badge>
        </Float>
      </Link>
    </IconButton>
  );
}
