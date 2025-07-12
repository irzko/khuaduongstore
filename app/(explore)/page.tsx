import { getGroupedProducts } from "@/lib/db";
import CategoryTabs from "@/components/ui/category-tabs";
import ProductCard from "@/components/ui/product-card";
import createSlug from "@/lib/createSlug";
import { Grid } from "@chakra-ui/react";
import PaginationBar from "@/components/ui/pagination";

export default async function Home() {
  const products = await getGroupedProducts();

  return (
    <>
      <CategoryTabs slug="/" />
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
      <PaginationBar currentPage={1} count={products.length} />
    </>
  );
}
