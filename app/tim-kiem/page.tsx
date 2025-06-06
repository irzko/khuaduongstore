import { getGroupedProducts } from "@/lib/db";
import SearchProductForm from "@/components/ui/search-product-form";
import { Suspense } from "react";
import Fallback from "@/components/ui/fallback";

export default async function Page() {
  const products = await getGroupedProducts();
  return (
    <Suspense fallback={<Fallback />}>
      <SearchProductForm products={products} />
    </Suspense>
  );
}
