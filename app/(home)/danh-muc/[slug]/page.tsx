export const dynamic = "force-static";
import createSlug from "@/lib/createSlug";
import ProductCard from "@/components/ui/product-card";
import { Grid } from "@chakra-ui/react";
import CategoryTabs from "@/components/ui/category-tabs";

import { getGroupedProducts } from "@/lib/db";
import { Metadata } from "next";

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
    <>
      <CategoryTabs slug={slug} />
      <Grid
        paddingX="1rem"
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(4, 1fr)",
          "repeat(6, 1fr)",
          "repeat(6, 1fr)",
        ]}
        gap="1rem"
      >
        {products
          .reverse()
          .slice(0, Math.min(12, products.length))
          .map((product) => (
            <ProductCard key={createSlug(product.name)} product={product} />
          ))}
      </Grid>
    </>
  );
}
