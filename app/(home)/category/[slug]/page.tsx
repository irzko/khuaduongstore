export const dynamic = "force-static";
import {
  Flex,
  Grid,
  Text,
  Heading,
  Container,
  Card,
  Image,
} from "@chakra-ui/react";
import slugify from "slugify";
import NextImage from "next/image";
import NextLink from "next/link";
import { getAllProducts } from "@/lib/db";
import { Metadata } from "next";
import CategoryTabs from "@/components/ui/category-tabs";

const getProducts = async (slug: string) => {
  const products = await getAllProducts();
  return products.filter((product) => {
    return (
      slugify(product.category, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: true,
        locale: "vi",
        trim: true,
      }) === slug
    );
  });
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const products = await getProducts(slug.replace(".html", ""));

  return {
    title: products ? products[0].category : "No Name",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const products = await getProducts(slug.replace(".html", ""));

  return (
    <Container maxW="5xl" spaceY="1rem" padding="1rem">
      <CategoryTabs slug={slug} />
      <Grid
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(4, 1fr)",
          "repeat(6, 1fr)",
          "repeat(6, 1fr)",
        ]}
        gap="0.5rem"
      >
        {products.map((product) => (
          <Card.Root key={product.id} asChild overflow="hidden">
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
              <Flex position="relative" aspectRatio={1}>
                <Image asChild alt={product.name}>
                  <NextImage
                    src={product.image.split("\n")[0] || "/no-image.jpg"}
                    alt={product.name}
                    style={{ objectFit: "cover" }}
                    fill
                    unoptimized
                  />
                </Image>
              </Flex>
              <Card.Body padding="0.5rem" direction="col">
                <Text fontSize="sm" color="orange" fontWeight="bold">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </Text>
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
