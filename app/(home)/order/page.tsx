import CheckoutForm from "@/components/ui/checkout-form";
import { Container } from "@chakra-ui/react";
import { getAllProducts } from "@/lib/db";

export default async function Page() {
  const products = await getAllProducts();
  return (
    <Container maxW="5xl" padding="1rem" spaceY="1rem">
      <CheckoutForm products={products} />
    </Container>
  );
}
