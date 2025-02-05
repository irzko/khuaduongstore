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
  Separator,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { EmptyState } from "@/components/ui/empty-state";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import { Toaster } from "@/components/ui/toaster";
import Carousel from "@/components/ui/carousel";
import BuyButton from "@/components/ui/buy-button";
import NextLink from "next/link";
import slugify from "slugify";
import { calculateSimilarity } from "@/lib/calculateSimilarity";

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
  const currentProduct = allProducts.find((p) => p.id === productId);

  if (!currentProduct) {
    return (
      <EmptyState
        title="Sản phẩm không tồn tại"
        description="Sản phẩm bạn đang tìm kiếm không tồn tại"
      />
    );
  }

  // const productSuggetions = allProducts.filter(
  //   (p) => p.category === product.category && p.id !== product.id
  // );

  const recommendedProducts = allProducts
    .filter((p) => p.id !== productId)
    .map((product) => ({
      ...product,
      similarityScore: calculateSimilarity(currentProduct, product),
    }))
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 6);

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
              <Carousel imageUrlList={currentProduct.image.split("\n")} />
              <Flex position="fixed" bottom="0" insetX={0} zIndex={40}>
                <Grid
                  templateColumns="repeat(2, 1fr)"
                  paddingY="0.5rem"
                  paddingX="1rem"
                  w="full"
                  gap="1rem"
                  // backdropFilter="blur(16px) saturate(1.5)"
                  backgroundColor={{
                    base: "rgba(255, 255, 255)",
                    _dark: "rgba(0, 0, 0)",
                  }}
                >
                  <AddToCartButton productId={currentProduct.id} />
                  <BuyButton product={currentProduct} />
                </Grid>
              </Flex>
              <Flex direction="column" gap="1rem">
                <Heading as="h1" size="2xl">
                  {currentProduct.name || "(No name)"}
                </Heading>
                <Text>
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(currentProduct.price)}
                </Text>
              </Flex>
              <Separator />

              <Heading size="md" marginBottom="1rem">
                Mô tả sản phẩm
              </Heading>
              <Text whiteSpace="pre-line" color="gray" fontSize="sm">
                {currentProduct.description}
              </Text>
            </Stack>
          </Flex>
          <Separator />
          <Box
            width={{
              base: "full",
              md: "32rem",
            }}
          >
            <Heading size="lg" marginBottom="1rem">
              Đề xuất cho bạn
            </Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap="1rem">
              {recommendedProducts.map((product) => (
                <Card.Root key={product.id} asChild overflow="hidden" border="none">
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
          </Box>
        </Flex>
      </Container>
      <Toaster />
    </>
  );
}
