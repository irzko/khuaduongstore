import { getAllProducts } from "@/lib/db";
import SearchProductForm from "@/components/ui/search-product-form";


export default async function Page() {
  const products = await getAllProducts();
  return (
    <SearchProductForm products={products} />
  );
}
