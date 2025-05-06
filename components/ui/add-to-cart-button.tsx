"use client";

import { useContext } from "react";
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
import CartContext from "@/context/cart-context";
import { toaster } from "@/components/ui/toaster";
import { BsBagPlus } from "react-icons/bs";
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
import Image from "next/image";
import createSlug from "@/lib/createSlug";
import { useState, useMemo } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/button";

const compareTypes = (
  typeString: string,
  typeObject: Record<string, string>,
) => {
  const stringEntries = typeString.split("\n").reduce((acc, item) => {
    const [key, value] = item.split(":").map((s) => s.trim());
    return { ...acc, [key]: value };
  }, {});

  return JSON.stringify(stringEntries) === JSON.stringify(typeObject);
};

export default function AddToCartButton({
  product,
}: {
  product: IGroupedProduct;
}) {
  const { setCarts } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState<Record<string, string>>(
    product.detail[0].types
      ? product.detail[0].types.split("\n").reduce((acc, item) => {
          const [key, value] = item.split(":").map((s) => s.trim());
          return { ...acc, [key]: value };
        }, {})
      : {},
  );

  const [selectedProduct, setSelectedProduct] = useState<
    Omit<IProduct, "name">
  >(product.detail[0]);

  const inscreaseQuantity = () => {
    if (selectedType.stock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const typeProduct = useMemo(() => {
    const types = product.detail.map((item) => item.types);
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

  const handleChangeType = (key: string, value: string) => {
    setSelectedType((prev) => ({ ...prev, [key]: value }));
    setSelectedProduct(
      product.detail.find((item) =>
        compareTypes(item.types, { ...selectedType, [key]: value }),
      ) || product.detail[0],
    );
  };

  const handleClick = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as ICart[];
    if (cart.length !== 0) {
      const cartObj: ICart[] = cart
        .map((item) => {
          if (
            typeof item === "object" &&
            item !== null &&
            "slug" in item &&
            typeof (item as ICart).slug === "string" &&
            "quantity" in item &&
            typeof (item as ICart).quantity === "number" &&
            "types" in item &&
            typeof (item as ICart).types === "string"
          ) {
            return {
              slug: (item as ICart).slug,
              quantity: (item as ICart).quantity,
              types: (item as ICart).types,
            };
          }
          return null;
        })
        .filter((item): item is ICart => item !== null);
      const productIndex = cartObj.findIndex(
        (cart: { slug: string }) => cart.slug === createSlug(product.name),
      );
      if (productIndex !== -1) {
        cartObj[productIndex].quantity += 1;
      } else {
        cartObj.push({
          slug: createSlug(product.name),
          quantity,
          types: selectedProduct.types,
        });
      }
      localStorage.setItem("cart", JSON.stringify(cartObj));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([
          {
            slug: createSlug(product.name),
            quantity,
            types: selectedProduct.types,
          },
        ]),
      );
    }
    setCarts(
      JSON.parse(localStorage.getItem("cart") || "[]").map(
        (cart: { slug: string; quantity: number; types: string }) => ({
          slug: cart.slug,
          quantity: cart.quantity,
          types: cart.types,
        }),
      ),
    );
    toaster.create({
      title: "Thêm vào giỏ hàng thành công",
      type: "success",
    });
  };

  return (
    <>
      {!selectedType ? (
        <IconButton
          variant="outline"
          onClick={handleClick}
          rounded="xl"
          size="xl"
        >
          <BsBagPlus />
        </IconButton>
      ) : (
        <DrawerRoot placement="bottom">
          <DrawerBackdrop />
          <DrawerTrigger asChild>
            <IconButton variant="outline" rounded="xl" size="xl">
              <BsBagPlus />
            </IconButton>
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
                        product.detail[0].image.split("\n")[0] ||
                        "/no-image.jpg"
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
                      {selectedProduct.discountedPrice
                        ? Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(selectedProduct.discountedPrice)
                        : selectedProduct.price
                          ? Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(selectedProduct.price)
                          : "Giá không xác định"}
                    </Text>
                    <Text>Kho: {selectedProduct.stock}</Text>
                  </Box>
                </Flex>
                <Flex direction="column" gap="1rem">
                  {Object.keys(typeProduct).map((key) => (
                    <RadioCard.Root
                      key={key}
                      value={selectedType[key]}
                      onValueChange={(e) => handleChangeType(key, e.value)}
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
                <Button onClick={handleClick} rounded="xl">
                  Thêm vào giỏ hàng
                </Button>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerRoot>
      )}
    </>
  );
}
