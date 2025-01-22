"use client";

import CartContext from "@/context/cart-context";
import { Box, Card, Grid, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState, Suspense } from "react";
import Image from "next/image";

export default function CheckoutForm({ products }: { products: IProduct[] }) {
  const [checkoutProductList, setCheckoutProductList] = useState<
    Array<IProduct & { quantity: number }>
  >([]);
  const { carts } = useContext(CartContext);

  const searchParams = useSearchParams();
  useEffect(() => {
    const productsParam = searchParams.get("products");
    const checkoutProductId = productsParam
      ? Buffer.from(decodeURIComponent(productsParam), "base64").toString(
          "utf8"
        )
      : ([] as string[]);

    setCheckoutProductList(
      products
        .filter((product) => checkoutProductId.includes(product.id))
        .map((product) => ({
          ...product,
          quantity: carts.find((cart) => cart.id === product.id)?.quantity || 0,
        }))
    );
  }, [carts, products, searchParams]);
  return (
    <Suspense>
    <Card.Root>
      <Card.Header>
        <Card.Title fontSize="lg" fontWeight="bold">
          Thông tin đơn hàng
        </Card.Title>
      </Card.Header>
      <Card.Body>
        {checkoutProductList.map((product) => (
          <Grid
            key={product.id}
            templateColumns="repeat(3, minmax(0, 1fr))"
            gap="1rem"
          >
            <Box position="relative" aspectRatio={1}>
              <Image
                src={product.image || "/no-image.jpg"}
                alt={product.name}
                objectFit="contain"
                fill
              />
            </Box>
            <Box gridColumn="span 2 / span 2">
              <Text>{product.name}</Text>
              <Text color="red.500" fontWeight="bold">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </Text>
            </Box>
          </Grid>
        ))}
      </Card.Body>
    </Card.Root>
    </Suspense>
  );
}
