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
  RadioCard,
} from "@chakra-ui/react";
import createSlug from "@/lib/createSlug";
import Image from "next/image";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const compareTypes =
  
export default function BuyButton({ product }: { product: IProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<Record<string, string>>(
    product.detail[0].type.split("\n").reduce((acc, item) => {
      const [key, value] = item.split(":").map((s) => s.trim());
      return { ...acc, [key]: value };
    }, {}),
  );
  const [selectedProduct, setSelectedProduct] = useState<IProductDetail>(
    product.detail[0],
  );

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

  const typeProduct = useMemo(() => {
    const types = product.detail.map((item) => item.type);
    const typeGroups: { [key: string]: string[] } = {};

    types.forEach((type) => {
      if (!type) return;
      const entries = type.split("\n");
      entries.forEach((entry) => {
        const [key, value] = entry.split(":").map((s) => s.trim());
        if (key && value) {
          if (!typeGroups[key]) {
            typeGroups[key] = [];
          }
          if (!typeGroups[key].includes(value)) {
            typeGroups[key].push(value);
          }
        }
      });
    });

    return typeGroups;
  }, [product]);

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
                type: product.detail.find(
                  (item) =>
                    item.type ===
                    Object.entries(selectedType)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join("\n"),
                ),
              },
            ]),
          ).toString("base64"),
        ),
    );
  };

  const handleChangeType = (key: string, value: string) => {
    setSelectedType((prev) => ({ ...prev, [key]: value }));
    setSelectedProduct(
      product.detail.find(
        (item) =>
          item.type ===
          Object.entries({ ...selectedType, [key]: value })
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n"),
      ) || product.detail[0],
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
                  <Text fontWeight="semibold">{product.name}</Text>
                  <Text>
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.detail[0].price)}
                  </Text>
                  <Text>Kho: {product.detail[0].stock || 0}</Text>
                </Box>
              </Flex>
              <Flex direction="column" gap="1rem">
                {Object.keys(typeProduct).map((key) => (
                  <RadioCard.Root
                    key={key}
                    value={selectedType[key]}
                    onChange={(e) => handleChangeType(key, e.target.value)}
                    orientation="horizontal"
                    align="center"
                    justify="center"
                    size="sm"
                    maxW="lg"
                  >
                    <>
                      <RadioCard.Label>{key}</RadioCard.Label>
                      <Flex gap="0.5rem">
                        {typeProduct[key].map((value) => (
                          <RadioCard.Item
                            rounded="xl"
                            key={value}
                            value={value}
                          >
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl>
                              <RadioCard.ItemText ms="-4">
                                {value}
                              </RadioCard.ItemText>
                            </RadioCard.ItemControl>
                          </RadioCard.Item>
                        ))}
                      </Flex>
                    </>
                  </RadioCard.Root>
                ))}
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
