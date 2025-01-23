"use client";

import CartContext from "@/context/cart-context";
import { Box, Card, Flex, Input, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { Field } from "./field";
import { Button } from "./button";

function ProductCheckout({ products }: { products: IProduct[] }) {
  const [checkoutProductList, setCheckoutProductList] = useState<
    Array<IProduct & { quantity: number }>
  >([]);

  const [shippingInfo, setShippingInfo] = useState<{
    name: string;
    address: string;
    phone: string;
  }>({
    name: "",
    address: "",
    phone: "",
  });
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
    <Flex direction="column" gap="1rem">
      <Card.Root rounded="lg">
        <Card.Header>
          <Card.Title fontSize="lg" fontWeight="bold">
            Thông tin giao hàng
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Box spaceY="1rem" asChild>
            <form>
              <Field label="Họ và tên">
                <Input
                  name="name"
                  rounded="lg"
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, name: e.target.value })
                  }
                  placeholder="Nhập họ tên"
                />
              </Field>
              <Field label="Địa chỉ">
                <Input
                  name="address"
                  rounded="lg"
                  placeholder="Nhập địa chỉ"
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      address: e.target.value,
                    })
                  }
                />
              </Field>
              <Field label="Số điện thoại">
                <Input
                  name="phone"
                  rounded="lg"
                  placeholder="Nhập số điện thoại"
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, phone: e.target.value })
                  }
                />
              </Field>
            </form>
          </Box>
        </Card.Body>
      </Card.Root>
      <Card.Root rounded="lg">
        <Card.Header>
          <Card.Title fontSize="lg" fontWeight="bold">
            Thông tin đơn hàng
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Box divideY="1px">
            {checkoutProductList.map((product) => (
              <Flex key={product.id} gap="1rem" paddingY="1rem">
                <Box
                  position="relative"
                  height="5rem"
                  rounded="lg"
                  borderWidth="1px"
                  aspectRatio={1}
                >
                  <Image
                    src={product.image || "/no-image.jpg"}
                    alt={product.name}
                    objectFit="contain"
                    fill
                  />
                </Box>
                <Box gridColumn="span 2 / span 2">
                  <Text>{product.name}</Text>
                  <Flex gap="0.5rem">
                    <Text>{product.quantity} x</Text>
                    <Text color="red.500" fontWeight="bold">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            ))}
          </Box>

          <Flex justifyContent="space-between" mt="1rem">
            <Text>Tổng cộng:</Text>
            <Text color="red.500" fontWeight="bold">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(
                checkoutProductList.reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )
              )}
            </Text>
          </Flex>
        </Card.Body>
      </Card.Root>
      <Button colorScheme="primary" size="lg" rounded="lg" colorPalette="red">
        Đặt hàng
      </Button>
    </Flex>
  );
}

export default function CheckoutForm({ products }: { products: IProduct[] }) {
  return (
    <Suspense>
      <ProductCheckout products={products} />
    </Suspense>
  );
}
