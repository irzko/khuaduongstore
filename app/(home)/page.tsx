import { Container } from "@chakra-ui/react";
import { getGroupedProducts } from "@/lib/db";
import CategoryTabs from "@/components/ui/category-tabs";
import ProductPagination from "@/components/ui/product-pagination";

export default async function Home() {
  const products = await getGroupedProducts();

  return (
    <Container maxW="5xl" spaceY="1rem" padding="0">
      <CategoryTabs slug="/" />
      <ProductPagination products={products} />
    </Container>
  );
}
