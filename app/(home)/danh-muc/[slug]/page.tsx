export const dynamic = "force-static";
import { Container } from "@chakra-ui/react";
import createSlug from "@/lib/createSlug";

import { getGroupedProducts } from "@/lib/db";
import { Metadata } from "next";
import CategoryTabs from "@/components/ui/category-tabs";
import ProductPagination from "@/components/ui/product-pagination";

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
    <Container maxW="5xl" spaceY="1rem" paddingX="0">
      <CategoryTabs slug={slug} />
      <ProductPagination products={products} />
    </Container>
  );
}
