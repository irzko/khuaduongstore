import { Flex, Heading, Card, Image, Text } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import createSlug from "@/lib/createSlug";
import { FormatNumber } from "@chakra-ui/react";

export default function ProductCard({
  product,
}: Readonly<{
  product: IGroupedProduct;
}>) {
  return (
    <Card.Root asChild overflow="hidden" rounded="xl">
      <NextLink href={`/${createSlug(product.name)}.html`}>
        <Flex position="relative" p="0.125rem" aspectRatio={1}>
          <Image asChild alt={product.name} rounded="xl">
            <NextImage
              src={product.detail[0].image.split("\n")[0] || "/no-image.jpg"}
              alt={product.name}
              style={{ objectFit: "cover" }}
              quality={25}
              fill
              unoptimized
            />
          </Image>
        </Flex>
        <Card.Body
          paddingX="0.5rem"
          paddingY="1rem"
          gap="0.5rem"
          direction="col"
        >
          <Flex>
            {product.detail[0].discountedPrice !== 0 ? (
              <Flex alignItems="center" gap="0.5rem">
                <FormatNumber
                  value={product.detail[0].discountedPrice}
                  style="currency"
                  currency="VND"
                />

                <Text fontSize="sm" textDecoration="line-through">
                  <FormatNumber
                    value={product.detail[0].price || 0}
                    style="currency"
                    currency="VND"
                  />
                </Text>
              </Flex>
            ) : (
              <FormatNumber
                value={product.detail[0].price}
                style="currency"
                currency="VND"
              />
            )}
          </Flex>
          <Heading lineClamp={2} size="sm" color="#36454f">
            {product.name}
          </Heading>
        </Card.Body>
      </NextLink>
    </Card.Root>
  );
}
