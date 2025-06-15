import { Container } from "@chakra-ui/react";
import { getGroupedProducts } from "@/lib/db";
import CategoryTabs from "@/components/ui/category-tabs";
import ProductPagination from "@/components/ui/product-pagination";

export default async function Home() {
  const products = await getGroupedProducts();

  return (
    <Container maxW="5xl" padding="1rem" spaceY="1rem">
      <CategoryTabs slug="/" />
      <ProductPagination products={products} />
    </Container>
  );
}
