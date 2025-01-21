"use client";
import CartContext from "@/context/cart-context";
import { Box, Card, Container, Flex, Text, Link } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Product } from "@/models/product";
import { EmptyState } from "./empty-state";
import { LuShoppingCart } from "react-icons/lu";
import DeleteFromCartButton from "./delete-from-cart-button";
import NextLink from "next/link";
import slugify from "slugify";
import { getGSheet } from "@/lib/getGSheet";

export default function CartList() {
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  // const [products, setProducts] = useState<Product[]>([]);
  const { carts } = useContext(CartContext);
  useEffect(() => {
    const getProducts = async () => {
      const data = await getGSheet(
        "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
        "0"
      );
      const products = data.map((product) =>
        Product.fromJson({
          id: product["id"],
          name: product["name"],
          price: product["price"],
          image: product["image"],
          description: product["description"],
        })
      );

      setProductsInCart(
        products.filter((product) =>
          carts.some((cart) => cart.id === product.id)
        )
      );
    };

    getProducts();
  }, [carts]);

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
              {/* <Image src={product.image} alt={product.name} /> */}
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
                <Text color="red.500" fontWeight="bold">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </Text>
              </Box>
              <Box>
                <DeleteFromCartButton productId={product.id} />
              </Box>
            </Flex>
          ))}
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
