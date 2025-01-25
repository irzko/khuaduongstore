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
} from "@chakra-ui/react";
import Image from "next/image";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyButton({ product }: { product: IProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const inscreaseQuantity = () => {
    if (parseInt(product.stock) > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuy = () => {
    setIsLoading(true);
    router.push(
      "/order?products=" +
        encodeURIComponent(
          Buffer.from(
            JSON.stringify([
              {
                id: product.id,
                quantity,
              },
            ])
          ).toString("base64")
        )
    );
  };
  return (
    <DrawerRoot placement="bottom">
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button rounded="lg" colorPalette="red">
          Mua ngay
        </Button>
      </DrawerTrigger>
      <DrawerContent roundedTop="lg">
        <DrawerCloseTrigger />
        <DrawerHeader>
          <DrawerTitle />
        </DrawerHeader>
        <DrawerBody>
          <Stack gap="1rem">
            <Flex gap="1rem" alignItems="end">
              <Box
                rounded="lg"
                borderWidth="1px"
                overflow="hidden"
                position="relative"
                aspectRatio={1}
                w="5rem"
              >
                <Image
                  src={product.image.split("\n")[0] || "/no-image.jpg"}
                  alt={product.name}
                  style={{ objectFit: "contain" }}
                  unoptimized
                  fill
                />
              </Box>
              <Box>
                <Text color="red.500" fontWeight="bold" fontSize="xl">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </Text>
                <Text>Kho: {product.stock || 0}</Text>
              </Box>
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
            <Button
              loading={isLoading}
              onClick={handleBuy}
              rounded="lg"
              colorPalette="red"
            >
              Mua ngay
            </Button>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
}
