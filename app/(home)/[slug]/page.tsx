export const dynamic = "force-static";
import { getAllProducts } from "@/lib/db";
import { Metadata } from "next";
import { Breadcrumb } from "@chakra-ui/react";
import { LiaSlashSolid } from "react-icons/lia";
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
import createSlug from "@/lib/createSlug";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug.split(".")[0];
  const data = await getAllProducts();
  const product = data.find((item) => createSlug(item.name) === slug);

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
    (item) => createSlug(item.name) === slug,
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
    .filter((item) => createSlug(item.name) !== slug)
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
              <Breadcrumb.Root>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/">Trang chủ</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <LiaSlashSolid />
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link
                      href={`/danh-muc/${createSlug(currentProduct.category)}`}
                    >
                      {currentProduct.category}
                    </Breadcrumb.Link>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
              <Carousel imageUrlList={currentProduct.image.split("\n")} />

              <Flex direction="column" gap="1rem">
                <Heading as="h2" size="2xl" fontWeight="bold">
                  {currentProduct.name || "(No name)"}
                </Heading>
                <Heading as="h3" size="2xl" fontWeight="medium">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(currentProduct.price)}
                </Heading>
              </Flex>
              <Flex
                w="full"
                gap="1rem"
                paddingY="0.5rem"
                paddingX="1rem"
                position="fixed"
                insetX="0"
                bottom="0"
                zIndex="50"
                backgroundColor={{
                  base: "white",
                  _dark: "black",
                }}
              >
                <BuyButton product={currentProduct} />
                <AddToCartButton slug={createSlug(currentProduct.name)} />
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
                <ProductCard key={createSlug(product.name)} product={product} />
              ))}
            </Grid>
          </Box>
        </Flex>
      </Container>
      <Toaster />
    </>
  );
}
