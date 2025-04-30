import { Grid, Container } from "@chakra-ui/react";
import { getAllProducts } from "@/lib/db";
import CategoryTabs from "@/components/ui/category-tabs";
import ProductCard from "@/components/ui/product-card";
import slugify from "slugify";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <Container maxW="5xl" padding="1rem" spaceY="1rem">
      <CategoryTabs slug="/" />
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
          <ProductCard
            key={slugify(product.name, {
              replacement: "-",
              remove: undefined,
              lower: true,
              strict: true,
              locale: "vi",
              trim: true,
            })}
            product={product}
          />
        ))}
      </Grid>
    </Container>
  );
}
