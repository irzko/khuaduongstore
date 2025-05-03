"use client";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Box,
  Flex,
  Group,
  IconButton,
  Separator,
  Stack,
  Text,
  HStack,
  RadioCard,
} from "@chakra-ui/react";
import createSlug from "@/lib/createSlug";

import Image from "next/image";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyButton({ product }: { product: IProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const inscreaseQuantity = () => {
    if (product.detail[0].stock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  const typeProduct = 

  const handleBuy = () => {
    setIsLoading(true);
    router.push(
      "/dat-hang?products=" +
        encodeURIComponent(
          Buffer.from(
            JSON.stringify([
              {
                slug: createSlug(product.name),
                quantity,
              },
            ]),
          ).toString("base64"),
        ),
    );
  };
  return (
    <Box flexBasis="100%">
      <DrawerRoot placement="bottom">
        <DrawerBackdrop />
        <DrawerTrigger asChild w="full">
          <Button rounded="xl" size="xl">
            Mua ngay
          </Button>
        </DrawerTrigger>
        <DrawerContent roundedTop="2xl">
          <DrawerCloseTrigger />
          <DrawerHeader>
            <DrawerTitle />
          </DrawerHeader>
          <DrawerBody>
            <Stack gap="1rem">
              <Flex gap="1rem" alignItems="end">
                <Box
                  rounded="xl"
                  overflow="hidden"
                  position="relative"
                  aspectRatio={1}
                  w="5rem"
                >
                  <Image
                    src={
                      product.detail[0].image.split("\n")[0] || "/no-image.jpg"
                    }
                    alt={product.name}
                    style={{ objectFit: "cover" }}
                    unoptimized
                    fill
                  />
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize="xl">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.detail[0].price)}
                  </Text>
                  <Text>Kho: {product.detail[0].stock || 0}</Text>
                </Box>
              </Flex>
              <Flex>
                <RadioCard.Root
                  orientation="horizontal"
                  align="center"
                  justify="center"
                  maxW="lg"
                  defaultValue="paypal"
                >
                  <RadioCard.Label>Payment method</RadioCard.Label>
                  <HStack align="stretch">
                    <RadioCard.Item>
                      <RadioCard.ItemHiddenInput />
                      <RadioCard.ItemControl>
                        <RadioCard.ItemText ms="-4">h</RadioCard.ItemText>
                      </RadioCard.ItemControl>
                    </RadioCard.Item>
                  </HStack>
                </RadioCard.Root>
              </Flex>
              <Separator />
              <Flex justifyContent="space-between" alignItems="center">
                <Text>Số lượng: {quantity}</Text>
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
              </Flex>
              <Button loading={isLoading} onClick={handleBuy} rounded="xl">
                Mua ngay
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </Box>
  );
}
