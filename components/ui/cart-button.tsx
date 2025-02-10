"use client";

import CartContext from "@/context/cart-context";
import { Badge, Flex, Float, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { BsBag } from "react-icons/bs";

export default function CartButton() {
  const { carts } = useContext(CartContext);
  return (
    <IconButton variant="ghost" rounded="lg" asChild>
      <Link href="/cart">
        <Flex position="relative" padding="0.125rem">
          <BsBag />
          <Float placement="bottom-end" offsetX="1" offsetY="1">
            <Badge size="xs" variant="solid" rounded="full">
              {carts.length}
            </Badge>
          </Float>
        </Flex>
      </Link>
    </IconButton>
  );
}
