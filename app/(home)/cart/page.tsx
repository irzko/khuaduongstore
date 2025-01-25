import CartList from "@/components/ui/cart-list";
import { getAllProducts } from "@/lib/db";
import { unstable_cache } from "next/cache";

const getProducts = unstable_cache(
  async () => {
    return await getAllProducts();
  },
  ["products"],
  { tags: ["products"] }
);

export default async function CartPage() {
  const products = await getProducts();

  return <CartList products={products} />;
}
