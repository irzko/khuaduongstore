import CheckoutForm from "@/components/ui/checkout-form";
import { Container } from "@chakra-ui/react";
import { getAllProducts } from "@/lib/db";
import { Suspense } from "react";
import Fallback from "@/components/ui/fallback";

export default async function Page() {
  const products = await getAllProducts();
  return (
    <Container maxW="5xl" padding="1rem" spaceY="1rem">
      <Suspense fallback={<Fallback />}>
        <CheckoutForm products={products} />
      </Suspense>
    </Container>
  );
}
