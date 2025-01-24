"use client";

import { Box, Card, Flex, Input, Text } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { Field } from "./field";
import { Button } from "./button";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { createId } from "@paralleldrive/cuid2";

function ProductCheckout({ products }: { products: IProduct[] }) {
  const [checkoutProductList, setCheckoutProductList] = useState<
    Array<IProduct & { quantity: number }>
  >([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<{
    name: string;
    address: string;
    phone: string;
  }>({
    name: "",
    address: "",
    phone: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const productsParam = searchParams.get("products");
    const checkoutProductId: {
      id: string;
      quantity: number;
    }[] = productsParam
      ? JSON.parse(
          Buffer.from(decodeURIComponent(productsParam), "base64").toString(
            "utf8"
          )
        )
      : [];

    setCheckoutProductList(
      products
        .filter((product) =>
          checkoutProductId.some(
            (checkoutProduct) => checkoutProduct.id === product.id
          )
        )
        .map((product) => ({
          ...product,
          quantity:
            checkoutProductId.find(
              (checkoutProduct) => checkoutProduct.id === product.id
            )?.quantity || 0,
        }))
    );
  }, [products, searchParams]);
  const handleOrder = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzjMBjVzSLVBBFHNpxHVaCgKYlHOF0PJCoQKrjcyB-w3acS9k6Z_xwcMNN2U02_PA8/exec",
      {
        method: "POST",
        redirect: "follow",
        body: JSON.stringify({
          ...shippingInfo,
          id: createId(),
          products: checkoutProductList.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
            price: product.price,
            total: product.price * product.quantity,
          })),
        }),

        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }
    );
    setIsLoading(false);
    if (response.ok) {
      setOpen(true);
    } else {
      alert("Đặt hàng thất bại");
    }
  };
  return (
    <>
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
                      setShippingInfo({
                        ...shippingInfo,
                        phone: e.target.value,
                      })
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
                    overflow="hidden"
                    rounded="lg"
                    borderWidth="1px"
                    aspectRatio={1}
                  >
                    <Image
                      src={product.image || "/no-image.jpg"}
                      alt={product.name}
                      unoptimized
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
                    (total, product) =>
                      total + product.price * product.quantity,
                    0
                  )
                )}
              </Text>
            </Flex>
          </Card.Body>
        </Card.Root>
        <Button
          colorScheme="primary"
          size="lg"
          loading={isLoading}
          onClick={handleOrder}
          rounded="lg"
          colorPalette="red"
        >
          Đặt hàng
        </Button>
        <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
          <DialogBackdrop />
          <DialogContent>
            <DialogCloseTrigger />
            <DialogHeader>
              <DialogTitle>Thông báo</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Text>Đặt hàng thành công</Text>
            </DialogBody>
            <DialogFooter>
              <Button
                onClick={() => {
                  setOpen(false);
                  router.push("/cart");
                }}
              >
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </Flex>
    </>
  );
}

export default function CheckoutForm({ products }: { products: IProduct[] }) {
  return (
    <Suspense>
      <ProductCheckout products={products} />
    </Suspense>
  );
}
