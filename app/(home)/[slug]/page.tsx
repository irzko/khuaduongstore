import { unstable_cache } from "next/cache";

import slugify from "slugify";
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
// import { BreadcrumbLink, BreadcrumbRoot } from "@/components/ui/breadcrumb";
import Image from "next/image";
import { EmptyState } from "@/components/ui/empty-state";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import { Toaster } from "@/components/ui/toaster";
import Carousel from "@/components/ui/carousel";
import BuyButton from "@/components/ui/buy-button";
import { getAllProducts } from "@/lib/db";

const getProducts = unstable_cache(
  async (id: string) => {
    const products = await getAllProducts();
    return products.find((p) => p.id === id);
  },
  ["products"],
  { tags: ["products"] }
);

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug:
      slugify(product.name, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: true,
        locale: "vi",
        trim: true,
      }) +
      "-" +
      product.id +
      ".html",
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const id = slug.split(".")[0].split("-").pop() || "";
  const post = await getProducts(id);

  return {
    title: post ? post.name : "No Name",
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
  const product = await getProducts(productId);

  if (!product) {
    return (
      <EmptyState
        title="Sản phẩm không tồn tại"
        description="Sản phẩm bạn đang tìm kiếm không tồn tại"
      />
    );
  }

  // const breadcrumbs = post.categories.map((c) => ({
  //   id: c.category.id,
  //   name: c.category.name,
  //   href: `/category/${c.category.slug}`,
  // }));
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
            {/* <BreadcrumbRoot
            backgroundColor={{
              base: "white",
              _dark: "black",
            }}
            borderYWidth={1}
            position="sticky"
            top="4rem"
            paddingY="0.5rem"
            paddingX="1rem"
          >
            {breadcrumbs.map((b) => (
              <BreadcrumbLink key={b.id} href={b.href}>
                {b.name}
              </BreadcrumbLink>
            ))}
          </BreadcrumbRoot> */}
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
                <Grid templateColumns="repeat(3, minmax(0, 1fr))" gap="1rem">
                  <Box position="relative" aspectRatio={1}>
                    <Image
                      src={product.image.split("\n")[0] || "/no-image.jpg"}
                      alt={product.name}
                      style={{ objectFit: "contain" }}
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
              </Card.Body>
            </Card.Root>
          </Box>
        </Flex>
      </Container>
      <Toaster />
    </>
  );
}
