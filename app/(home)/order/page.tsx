import CheckoutForm from "@/components/ui/checkout-form";
import { Container } from "@chakra-ui/react";
import { unstable_cache } from "next/cache";
import { getAllProducts } from "@/lib/db";

const getProducts = unstable_cache(
  async () => {
    return await getAllProducts();
  },
  ["products"],
  { tags: ["products"] }
);

export default async function Page() {
  const products = await getProducts();
  return (
    <Container maxW="5xl" padding="1rem" spaceY="1rem">
      <CheckoutForm products={products} />
    </Container>
  );
}
