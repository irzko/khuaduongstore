export const dynamic = "force-static";
import { Grid, Container } from "@chakra-ui/react";
import slugify from "slugify";

import { getAllProducts } from "@/lib/db";
import { Metadata } from "next";
import CategoryTabs from "@/components/ui/category-tabs";
import ProductCard from "@/components/ui/product-card";

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
        gap="1rem"
      >
        {products.reverse().map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
}
