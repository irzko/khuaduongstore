export const dynamic = "force-static";
import { getAllProducts } from "@/lib/db";
import { Metadata } from "next";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  Separator,
} from "@chakra-ui/react";
import { EmptyState } from "@/components/ui/empty-state";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import { Toaster } from "@/components/ui/toaster";
import Carousel from "@/components/ui/carousel";
import BuyButton from "@/components/ui/buy-button";
import { calculateSimilarity } from "@/lib/calculateSimilarity";
import ProductCard from "@/components/ui/product-card";
import slugify from "slugify";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug.split(".")[0];
  const data = await getAllProducts();
  const product = data.find(
    (item) =>
      slugify(item.name, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: true,
        locale: "vi",
        trim: true,
      }) === slug,
  );

  return {
    title: product ? product.name : "No Name",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug.split(".")[0];

  const allProducts = await getAllProducts();
  const currentProduct = allProducts.find(
    (item) =>
      slugify(item.name, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: true,
        locale: "vi",
        trim: true,
      }) === slug,
  );

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
    .filter(
      (item) =>
        slugify(item.name, {
          replacement: "-",
          remove: undefined,
          lower: true,
          strict: true,
          locale: "vi",
          trim: true,
        }) !== slug,
    )
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
              <Flex
                w="full"
                gap="1rem"
                // backdropFilter="blur(16px) saturate(1.5)"
                backgroundColor={{
                  base: "white",
                  _dark: "black",
                }}
              >
                <BuyButton product={currentProduct} />
                <AddToCartButton
                  slug={slugify(currentProduct.name, {
                    replacement: "-",
                    remove: undefined,
                    lower: true,
                    strict: true,
                    locale: "vi",
                    trim: true,
                  })}
                />
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
                <ProductCard
                  key={slugify(product.name, {
                    replacement: "-",
                    remove: undefined,
                    lower: true,
                    strict: true,
                    locale: "vi",
                    trim: true,
                  })}
                  product={product}
                />
              ))}
            </Grid>
          </Box>
        </Flex>
      </Container>
      <Toaster />
    </>
  );
}
