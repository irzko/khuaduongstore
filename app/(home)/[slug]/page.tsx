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
} from "@chakra-ui/react";
import Image from "next/image";
import { EmptyState } from "@/components/ui/empty-state";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import { Toaster } from "@/components/ui/toaster";
import Carousel from "@/components/ui/carousel";
import BuyButton from "@/components/ui/buy-button";

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
    (p) => p.category === product.category && p.id !== product.id,
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
              <Text whiteSpace="pre-line">{product.description}</Text>
            </Stack>
          </Flex>
          <Box
            width={{
              base: "full",
              md: "32rem",
            }}
          >
            <Card.Root>
              <Card.Header>
                <Card.Title fontSize="lg" fontWeight="bold">
                  Sản phẩm liên quan
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Box spaceY="1rem">
                  {productSuggetions.slice(0, 5).map((product) => {
                    return (
                      <Grid
                        key={product.id}
                        templateColumns="repeat(3, minmax(0, 1fr))"
                        gap="1rem"
                      >
                        <Box
                          position="relative"
                          rounded="lg"
                          overflow="hidden"
                          aspectRatio={1}
                        >
                          <Image
                            src={
                              product.image.split("\n")[0] || "/no-image.jpg"
                            }
                            alt={product.name}
                            style={{ objectFit: "cover" }}
                            unoptimized
                            fill
                          />
                        </Box>
                        <Box gridColumn="span 2 / span 2">
                          <Text>{product.name}</Text>
                          <Text color="red.500" fontWeight="bold">
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.price)}
                          </Text>
                        </Box>
                      </Grid>
                    );
                  })}
                </Box>
              </Card.Body>
            </Card.Root>
          </Box>
        </Flex>
      </Container>
      <Toaster />
    </>
  );
}
