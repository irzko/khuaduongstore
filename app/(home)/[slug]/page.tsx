import { unstable_cache } from "next/cache";

import slugify from "slugify";
import { Metadata } from "next";
import {
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
// import { BreadcrumbLink, BreadcrumbRoot } from "@/components/ui/breadcrumb";
import { getGSheet } from "@/lib/getGSheet";
import Image from "next/image";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/ui/add-to-cart-button";

const getProducts = unstable_cache(
  async (id: string) => {
    const products = (await getGSheet(
      "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
      "0"
    )) as unknown as IProduct[];

    return products.find((p) => p.id === id);
  },
  ["products"],
  { tags: ["products"] }
);

export async function generateStaticParams() {
  const products = (await getGSheet(
    "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
    "0"
  )) as unknown as IProduct[];
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
    <VStack>
      <Flex
        direction={{
          base: "column",
          md: "row",
        }}
        maxWidth="1024px"
        w="full"
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
          <Stack paddingX="1rem" spaceY="1rem">
            <Box position="relative" aspectRatio={16 / 9}>
              <Image
                src={product.image || "/no-image.jpg"}
                alt={product.name}
                objectFit="contain"
                fill
              />
            </Box>

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
                  <Button rounded="lg">Mua ngay</Button>
                </Grid>
              </Card.Body>
            </Card.Root>
            <Text>{product.description}</Text>
          </Stack>
        </Flex>
        <Box
          padding="1rem"
          width={{
            base: "full",
            md: "32rem",
          }}
        >
          <Card.Root>
            <Card.Header>Đề xuất</Card.Header>
            <Card.Body>
              <Box>
                <Box position="relative" aspectRatio={1}>
                  <Image
                    src={product.image || "/no-image.jpg"}
                    alt={product.name}
                    objectFit="contain"
                    fill
                  />
                </Box>
                <Text>{product.name}</Text>
                <Text color="red.500" fontWeight="bold">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </Text>
              </Box>
            </Card.Body>
          </Card.Root>
        </Box>
      </Flex>
    </VStack>
  );
}
