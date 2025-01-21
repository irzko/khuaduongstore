import CartList from "@/components/ui/cart-list";
import { getGSheet } from "@/lib/getGSheet";
import { Product } from "@/models/product";
import { unstable_cache } from "next/cache";

const getProducts = unstable_cache(
  async () => {
    const data = await getGSheet(
      "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
      "0"
    );
    return data.map((product) =>
      Product.fromJson({
        id: product["id"],
        name: product["name"],
        price: product["price"],
        image: product["image"],
        description: product["description"],
      })
    );
  },
  ["products"],
  { tags: ["products"] }
);

export default async function CartPage() {
  const products = await getProducts();

  return <CartList products={products} />;
}
