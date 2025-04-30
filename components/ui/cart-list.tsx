"use client";
import CartContext from "@/context/cart-context";
import { Box, Container, Flex, Text, Link, Heading } from "@chakra-ui/react";
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
        .filter((product) =>
          carts.some(
            (cart) =>
              cart.slug ===
              slugify(product.name, {
                replacement: "-",
                remove: undefined,
                lower: true,
                strict: true,
                locale: "vi",
                trim: true,
              }),
          ),
        )
        .map((product) => ({
          ...product,
          quantity:
            carts.find(
              (cart) =>
                cart.slug ===
                slugify(product.name, {
                  replacement: "-",
                  remove: undefined,
                  lower: true,
                  strict: true,
                  locale: "vi",
                  trim: true,
                }),
            )?.quantity || 0,
          isChecked: false,
        })),
    );
  }, [carts, products]);

  const toggleProductCheck = useCallback(
    (slug: string) => {
      console.log(slug);
      setProductsInCart(
        productsInCart.map((product) => {
          if (
            slugify(product.name, {
              replacement: "-",
              remove: undefined,
              lower: true,
              strict: true,
              locale: "vi",
              trim: true,
            }) === slug
          ) {
            return { ...product, isChecked: !product.isChecked };
          }
          return product;
        }),
      );
    },
    [productsInCart],
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
      <Heading size="2xl" fontWeight="bold">
        Giỏ hàng
      </Heading>
      <Flex direction="column" divideY="1px">
        {productsInCart.map((product) => (
          <Flex
            paddingY="1rem"
            key={slugify(product.name, {
              replacement: "-",
              remove: undefined,
              lower: true,
              strict: true,
              locale: "vi",
              trim: true,
            })}
            justifyContent="space-between"
            alignItems="center"
          >
            <Flex gap="1rem">
              <Checkbox
                checked={product.isChecked}
                onCheckedChange={() =>
                  toggleProductCheck(
                    slugify(product.name, {
                      replacement: "-",
                      remove: undefined,
                      lower: true,
                      strict: true,
                      locale: "vi",
                      trim: true,
                    }),
                  )
                }
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
                    })}.html`}
                  >
                    <Text fontWeight="bold">{product.name}</Text>
                  </NextLink>
                </Link>
                <Text fontSize="sm" color="gray.500">
                  Số lượng: {product.quantity}
                </Text>
                <Text fontWeight="bold">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </Text>
              </Box>
            </Flex>
            <Flex alignItems="center" gap="1rem">
              <AdjustQuantity
                slug={slugify(product.name, {
                  replacement: "-",
                  remove: undefined,
                  lower: true,
                  strict: true,
                  locale: "vi",
                  trim: true,
                })}
              />
              <DeleteFromCartButton
                slug={slugify(product.name, {
                  replacement: "-",
                  remove: undefined,
                  lower: true,
                  strict: true,
                  locale: "vi",
                  trim: true,
                })}
              />
            </Flex>
          </Flex>
        ))}
      </Flex>
      <Box
        position="sticky"
        bottom="0"
        backgroundColor={{
          base: "white",
          _dark: "black",
        }}
      >
        {
          <Flex justifyContent="space-between" alignItems="center">
            <Checkbox
              checked={productsInCart.every((product) => product.isChecked)}
              onCheckedChange={() => {
                setProductsInCart(
                  productsInCart.map((product) => ({
                    ...product,
                    isChecked: !productsInCart.every(
                      (product) => product.isChecked,
                    ),
                  })),
                );
              }}
            >
              Tất cả
            </Checkbox>
            <Flex gap="0.5rem" alignItems="center">
              <Box whiteSpace="nowrap" fontSize="xs">
                Tổng tiền:{" "}
              </Box>
              <Text fontWeight="bold">
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
                    0,
                  ),
                )}
              </Text>
              <Button whiteSpace="wrap" rounded="xl" asChild>
                <NextLink
                  href={
                    "/dat-hang?products=" +
                    encodeURIComponent(
                      Buffer.from(
                        JSON.stringify(
                          productsInCart
                            .filter((product) => product.isChecked)
                            .map((product) => ({
                              slug: slugify(product.name, {
                                replacement: "-",
                                remove: undefined,
                                lower: true,
                                strict: true,
                                locale: "vi",
                                trim: true,
                              }),
                              quantity: product.quantity,
                            })),
                        ),
                      ).toString("base64"),
                    )
                  }
                >
                  Đặt hàng (
                  {productsInCart.reduce(
                    (acc, product) => acc + (product.isChecked ? 1 : 0),
                    0,
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
