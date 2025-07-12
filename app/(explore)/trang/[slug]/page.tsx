export const dynamic = "force-static";
import ProductCard from "@/components/ui/product-card";
import createSlug from "@/lib/createSlug";
import { Grid } from "@chakra-ui/react";
import { getGroupedProducts } from "@/lib/db";
import PaginationBar from "@/components/ui/pagination";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = await params;
  const currentPage = Number(slug.slug) || 1;
  const allProducts = await getGroupedProducts();

  return (
    <>
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
        {allProducts
          .reverse()
          .slice(
            (currentPage - 1) * 12,
            Math.min(currentPage * 12, allProducts.length),
          )
          .map((product) => (
            <ProductCard key={createSlug(product.name)} product={product} />
          ))}
      </Grid>
      <PaginationBar currentPage={currentPage} count={allProducts.length} />
    </>
  );
}
