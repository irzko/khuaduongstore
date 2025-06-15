"use client";
import ProductCard from "@/components/ui/product-card";
import createSlug from "@/lib/createSlug";
import { Grid } from "@chakra-ui/react";
import PaginationBar from "./pagination";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const ProductPagination = (props: { products: IGroupedProduct[] }) => {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
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
        {props.products
          .reverse()
          .slice(
            (currentPage - 1) * 12,
            Math.min(currentPage * 12, props.products.length),
          )
          .map((product) => (
            <ProductCard key={createSlug(product.name)} product={product} />
          ))}
      </Grid>
      <PaginationBar currentPage={currentPage} count={props.products.length} />
    </Suspense>
  );
};

export default ProductPagination;
