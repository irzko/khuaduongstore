import { unstable_cache } from "next/cache";

import slugify from "slugify";
import { Metadata } from "next";
import { Box, Flex, Heading, Stack, VStack } from "@chakra-ui/react";
// import { BreadcrumbLink, BreadcrumbRoot } from "@/components/ui/breadcrumb";
import { getGSheet } from "@/lib/getGSheet";
import { Product } from "@/models/product";
import Image from "next/image";
import { EmptyState } from "@/components/ui/empty-state";

const getProducts = unstable_cache(
  async (id: string) => {
    const data = await getGSheet(
      "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
      "0"
    );
    const products = data.map((product) =>
      Product.fromJson({
        id: product["id"],
        name: product["name"],
        price: product["price"],
        image: product["image"],
        description: product["description"],
      })
    );

    return products.find((p) => p.id === id);
  },
  ["products"],
  { tags: ["products"] }
);

export async function generateStaticParams() {
  const data = await getGSheet(
    "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
    "0"
  );
  const products = data.map((product) =>
    Product.fromJson({
      id: product["id"],
      name: product["name"],
      price: product["price"],
      image: product["image"],
      description: product["description"],
    })
  );
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
  // read route params
  const slug = (await params).slug;

  // fetch data
  const id = slug.split(".")[0].split("-").pop() || "";

  const post = await getProducts(id);

  return {
    title: post ? post.name : "No Name",
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
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
        gap="1rem"
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
          <Stack paddingX="1rem">
            <Box position="relative" aspectRatio={16 / 9}>
              <Image
                src={product.image || "/no-image.jpg"}
                alt={product.name}
                objectFit="contain"
                fill
              />
            </Box>
            <Heading as="h1" size="lg">
              {product.name || "(No title)"}
            </Heading>
            <p>
              {/* {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })} */}
            </p>

            <p className="font-semibold">{product.price}</p>
          </Stack>
        </Flex>
        <Stack
          bgColor={"gray.100"}
          width={{
            base: "full",
            md: "32rem",
          }}
        >
          Đề xuất
        </Stack>
      </Flex>
    </VStack>
  );
}
