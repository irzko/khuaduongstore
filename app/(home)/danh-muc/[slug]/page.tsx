export const dynamic = "force-static";
import { Grid, Container } from "@chakra-ui/react";
import createSlug from "@/lib/createSlug";

import { getGroupedProducts } from "@/lib/db";
import { Metadata } from "next";
import CategoryTabs from "@/components/ui/category-tabs";
import ProductCard from "@/components/ui/product-card";

const getProducts = async (slug: string) => {
  const products = await getGroupedProducts();
  return products.filter((product) => {
    return createSlug(product.detail[0].category || "Khác") === slug;
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
    title: products ? products[0].detail[0].category : "Khác",
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
          <ProductCard key={createSlug(product.name)} product={product} />
        ))}
      </Grid>
    </Container>
  );
}
