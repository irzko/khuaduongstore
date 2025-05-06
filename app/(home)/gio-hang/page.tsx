import CartList from "@/components/ui/cart-list";
import { getAllProducts } from "@/lib/db";

export default async function CartPage() {
  const products = await getAllProducts();
  console.log(products);

  return <CartList products={products} />;
}
