export const dynamic = "force-static";
import { getAllProducts } from "@/lib/db";
import { Metadata } from "next";
import {
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { EmptyState } from "@/components/ui/empty-state";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import { Toaster } from "@/components/ui/toaster";
import Carousel from "@/components/ui/carousel";
import BuyButton from "@/components/ui/buy-button";
import NextLink from "next/link";
import slugify from "slugify";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const id = slug.split(".")[0].split("-").pop() || "";
  const data = await getAllProducts();
  const product = data.find((p) => p.id === id);

  return {
    title: product ? product.name : "No Name",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const productId = slug.split(".")[0].split("-").pop();

  if (!productId) {
    return null;
  }
  const allProducts = await getAllProducts();
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <EmptyState
        title="Sản phẩm không tồn tại"
        description="Sản phẩm bạn đang tìm kiếm không tồn tại"
      />
    );
  }

  const productSuggetions = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <>
      <Container maxW="5xl" padding="1rem">
        <Flex
          direction={{
            base: "column",
            md: "row",
          }}
          w="full"
          gap="1rem"
        >
          <Flex direction="column" gap="1rem" w="full">
            <Stack spaceY="1rem">
              <Carousel imageUrlList={product.image.split("\n")} />

              <Card.Root rounded="lg">
                <Card.Header paddingTop="1rem" paddingX="1rem">
                  <Heading as="h1" size="lg">
                    {product.name || "(No title)"}
                  </Heading>
                  <Text color="red.500" fontWeight="bold">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </Text>
                </Card.Header>
                <Card.Body padding="1rem">
                  <Grid templateColumns="1fr 1fr" gap="1rem">
                    <AddToCartButton productId={product.id} />
                    <BuyButton product={product} />
                  </Grid>
                </Card.Body>
              </Card.Root>
              <Text marginBottom="1rem">Mô tả sản phẩm</Text>
              <Text whiteSpace="pre-line">{product.description}</Text>
            </Stack>
          </Flex>
          <Box
            width={{
              base: "full",
              md: "32rem",
            }}
          >
            <Heading marginBottom="1rem">Sản phẩm tương tự</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap="0.5rem">
              {productSuggetions.slice(0, 6).map((product) => (
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
                    <Card.Body
                      gap="0.5rem"
                      padding="0.5rem"
                      direction="col"
                      justifyContent="space-between"
                    >
                      <Heading lineClamp={2} size="md">
                        {product.name}
                      </Heading>
                      <Text fontSize="md" color="red.500" fontWeight="bold">
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.price)}
                      </Text>
                    </Card.Body>
                  </NextLink>
                </Card.Root>
              ))}
            </Grid>
          </Box>
        </Flex>
      </Container>
      <Toaster />
    </>
  );
}
