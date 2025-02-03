"use client";

import CartContext from "@/context/cart-context";
import { Badge, Float, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { TbShoppingCart } from "react-icons/tb";

export default function CartButton() {
  const { carts } = useContext(CartContext);
  return (
    <IconButton variant="ghost" rounded="lg" asChild>
      <Link href="/cart">
        <TbShoppingCart />
        <Float placement="top-end" offsetX="1" offsetY="1">
          <Badge colorPalette="red" size="xs" rounded="full" variant="solid">
            {carts.length}
          </Badge>
        </Float>
      </Link>
    </IconButton>
  );
}
