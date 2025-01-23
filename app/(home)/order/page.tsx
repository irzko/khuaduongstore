import CheckoutForm from "@/components/ui/checkout-form";
import { getGSheet } from "@/lib/getGSheet";
import { Container } from "@chakra-ui/react";
import { unstable_cache } from "next/cache";

const getProducts = unstable_cache(
  async () => {
    return (await getGSheet(
      "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
      "0"
    )) as unknown as IProduct[];
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
