import { getAllProducts } from "@/lib/db";
import SearchProductForm from "@/components/ui/search-product-form";
import { Suspense } from "react";

export default async function Page() {
  const products = await getAllProducts();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchProductForm products={products} />
    </Suspense>
  );
}
