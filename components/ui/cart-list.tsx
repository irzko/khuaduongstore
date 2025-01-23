"use client";
import CartContext from "@/context/cart-context";
import { Box, Card, Container, Flex, Text, Link } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { EmptyState } from "./empty-state";
import { LuShoppingCart } from "react-icons/lu";
import DeleteFromCartButton from "./delete-from-cart-button";
import NextLink from "next/link";
import slugify from "slugify";
import AdjustQuantity from "./adjust-quantity";
import { Checkbox } from "./checkbox";
import { Button } from "./button";

export default function CartList({ products }: { products: IProduct[] }) {
  const [productsInCart, setProductsInCart] = useState<
    Array<IProduct & { quantity: number; isChecked: boolean }>
  >([]);
  const { carts } = useContext(CartContext);
  useEffect(() => {
    setProductsInCart(
      products
        .filter((product) => carts.some((cart) => cart.id === product.id))
        .map((product) => ({
          ...product,
          quantity: carts.find((cart) => cart.id === product.id)?.quantity || 0,
          isChecked: false,
        }))
    );
  }, [carts, products]);

  const toggleProductCheck = useCallback(
    (productId: string) => {
      setProductsInCart(
        productsInCart.map((product) => {
          if (product.id === productId) {
            return { ...product, isChecked: !product.isChecked };
          }
          return product;
        })
      );
    },
    [productsInCart]
  );

  if (carts.length === 0) {
    return (
      <EmptyState
        icon={<LuShoppingCart />}
        title="Giỏ hàng trống"
        description="Khám phá sản phẩm của chúng tôi và thêm vào giỏ hàng"
      />
    );
  }

  return (
    <Container maxW="5xl" padding="1rem" spaceY="1rem">
      <Card.Root rounded="lg">
        <Card.Header borderBottomWidth="1px" padding="1rem">
          <Card.Title fontSize="lg" fontWeight="bold">
            Giỏ hàng
          </Card.Title>
        </Card.Header>
        <Card.Body padding="1rem" divideY="1px">
          {productsInCart.map((product) => (
            <Flex
              paddingY="1rem"
              key={product.id}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap="1rem">
                <Checkbox
                  checked={product.isChecked}
                  onCheckedChange={() => toggleProductCheck(product.id)}
                ></Checkbox>
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
                      <Text fontWeight="bold">{product.name}</Text>
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
              </Flex>
              <Flex alignItems="center" gap="1rem">
                <AdjustQuantity productId={product.id} />
                <DeleteFromCartButton productId={product.id} />
              </Flex>
            </Flex>
          ))}
        </Card.Body>
      </Card.Root>
      <Box position="sticky" bottom="0">
        {
          <Flex justifyContent="space-between" alignItems="center">
            <Checkbox
              checked={productsInCart.every((product) => product.isChecked)}
              onCheckedChange={() => {
                setProductsInCart(
                  productsInCart.map((product) => ({
                    ...product,
                    isChecked: !productsInCart.every(
                      (product) => product.isChecked
                    ),
                  }))
                );
              }}
            >
              Tất cả
            </Checkbox>
            <Flex gap="0.5rem" alignItems="center">
              <Box whiteSpace="nowrap" fontSize="xs">
                Tổng tiền:{" "}
              </Box>
              <Text fontWeight="bold" color="red.500">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  productsInCart.reduce(
                    (acc, product) =>
                      acc +
                      product.price *
                        product.quantity *
                        (product.isChecked ? 1 : 0),
                    0
                  )
                )}
              </Text>
              <Button whiteSpace="wrap" rounded="lg" colorPalette="red" asChild>
                <NextLink
                  href={
                    "/order?products=" +
                    encodeURIComponent(
                      Buffer.from(
                        productsInCart
                          .filter((product) => product.isChecked)
                          .map((product) => product.id)
                          .join(",")
                      ).toString("base64")
                    )
                  }
                >
                  Đặt hàng (
                  {productsInCart.reduce(
                    (acc, product) => acc + (product.isChecked ? 1 : 0),
                    0
                  )}
                  )
                </NextLink>
              </Button>
            </Flex>
          </Flex>
        }
      </Box>
    </Container>
  );
}
