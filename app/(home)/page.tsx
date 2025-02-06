import {
  Flex,
  Grid,
  Heading,
  Container,
  Card,
  Image,
  Badge,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import slugify from "slugify";
import { getAllProducts } from "@/lib/db";
import CategoryTabs from "@/components/ui/category-tabs";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <Container maxW="5xl" padding="1rem" spaceY="1rem">
      <CategoryTabs slug="/" />
      <Grid
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(4, 1fr)",
          "repeat(6, 1fr)",
          "repeat(6, 1fr)",
        ]}
        gap="1rem"
      >
        {products.map((product) => (
          <Card.Root
            key={product.id}
            asChild
            overflow="hidden"
            rounded="2xl"
            border="none"
          >
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
              <Flex position="relative" p="0.125rem" aspectRatio={1}>
                <Image asChild alt={product.name} rounded="2xl">
                  <NextImage
                    src={product.image.split("\n")[0] || "/no-image.jpg"}
                    alt={product.name}
                    style={{ objectFit: "cover" }}
                    fill
                    unoptimized
                  />
                </Image>
              </Flex>
              <Card.Body paddingX="0rem" paddingY="1rem" gap="0.5rem" direction="col">
                <Flex>
                  <Badge
                    colorPalette="blue"
                    variant="solid"
                    size="md"
                    rounded="full"
                  >
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </Badge>
                </Flex>
                <Heading lineClamp={2} size="sm">
                  {product.name}
                </Heading>
              </Card.Body>
            </NextLink>
          </Card.Root>
        ))}
      </Grid>
    </Container>
  );
}
