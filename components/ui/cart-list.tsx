"use client";
import CartContext from "@/context/cart-context";
import { Box, Card, Container, Flex, Text, Link } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { EmptyState } from "./empty-state";
import { LuShoppingCart } from "react-icons/lu";
import DeleteFromCartButton from "./delete-from-cart-button";
import NextLink from "next/link";
import slugify from "slugify";
import AdjustQuantity from "./adjust-quantity";

export default function CartList({ products }: { products: IProduct[] }) {
  const [productsInCart, setProductsInCart] = useState<
    Array<IProduct & { quantity: number }>
  >([]);
  const { carts } = useContext(CartContext);
  useEffect(() => {
    setProductsInCart(
      products
        .filter((product) => carts.some((cart) => cart.id === product.id))
        .map((product) => ({
          ...product,
          quantity: carts.find((cart) => cart.id === product.id)?.quantity || 0,
        }))
    );
  }, [carts, products]);

  if (productsInCart.length === 0) {
    return (
      <EmptyState
        icon={<LuShoppingCart />}
        title="Giỏ hàng trống"
        description="Khám phá sản phẩm của chúng tôi và thêm vào giỏ hàng"
      />
    );
  }

  return (
    <Container maxW="5xl" padding="1rem">
      <Card.Root>
        <Card.Body divideY="1px">
          {productsInCart.map((product) => (
            <Flex key={product.id} justifyContent="space-between">
              <Box>
                <Link asChild>
                  <NextLink
                    href={`/${slugify(product.name, {
                      replacement: "-",
                      remove: undefined,
                      lower: true,
                      strict: true,
                      locale: "vi",
                      trim: true,
                    })}-${product.id}.html`}
                  >
                    <Text>{product.name}</Text>
                  </NextLink>
                </Link>
                <Text fontSize="sm" color="gray.500">
                  Số lượng: {product.quantity}
                </Text>
                <Text color="red.500" fontWeight="bold">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </Text>
              </Box>
              <Flex alignItems="center" gap="1rem">
                <AdjustQuantity productId={product.id} />
                <DeleteFromCartButton productId={product.id} />
              </Flex>
            </Flex>
          ))}
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
