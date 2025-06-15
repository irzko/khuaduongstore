import ProductCard from "@/components/ui/product-card";
import createSlug from "@/lib/createSlug";
import { Grid } from "@chakra-ui/react";
import PaginationBar from "./pagination";
import { Suspense } from "react";

const ProductPagination = async ({
  products,
  searchParams,
}: {
  products: IGroupedProduct[];
  searchParams?: Promise<{
    page?: string;
  }>;
}) => {
  const allSearchParams = await searchParams;
  const currentPage = Number(allSearchParams?.page) || 1;
  return (
    <Suspense key={currentPage}>
      <Grid
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(4, 1fr)",
          "repeat(6, 1fr)",
          "repeat(6, 1fr)",
        ]}
        gap="1rem"
      >
        {products
          .slice((currentPage - 1) * 12, currentPage * 12)
          .reverse()
          .map((product) => (
            <ProductCard key={createSlug(product.name)} product={product} />
          ))}
      </Grid>
      <PaginationBar
        currentPage={currentPage}
        count={Math.ceil(products.length / 12)}
      />
    </Suspense>
  );
};

export default ProductPagination;
