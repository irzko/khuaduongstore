import { Flex, Heading, Card, Image, Text } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import createSlug from "@/lib/createSlug";

export default function ProductCard({
  product,
}: Readonly<{
  product: IGroupedProduct;
}>) {
  return (
    <Card.Root asChild overflow="hidden" rounded="2xl" border="none">
      <NextLink href={`/${createSlug(product.name)}.html`}>
        <Flex position="relative" p="0.125rem" aspectRatio={1}>
          <Image asChild alt={product.name} rounded="2xl">
            <NextImage
              src={product.detail[0].image?.split("\n")[0] || "/no-image.jpg"}
              alt={product.name}
              style={{ objectFit: "cover" }}
              fill
              unoptimized
            />
          </Image>
        </Flex>
        <Card.Body paddingX="0rem" paddingY="1rem" gap="0.5rem" direction="col">
          <Flex>
            {product.detail[0].discountedPrice ? (
              <Flex>
                <Text
                  style={{
                    textDecoration: "line-through",
                  }}
                >
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.detail[0].price || 0)}
                </Text>
                <Text>
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.detail[0].discountedPrice)}
                </Text>
              </Flex>
            ) : (
              <Text>
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.detail[0].price || 0)}
              </Text>
            )}
          </Flex>
          <Heading lineClamp={2} size="sm">
            {product.name}
          </Heading>
        </Card.Body>
      </NextLink>
    </Card.Root>
  );
}
