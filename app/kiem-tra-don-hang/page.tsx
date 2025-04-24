import CheckOrderForm from "@/components/ui/check-order-form";
import Fallback from "@/components/ui/fallback";
import { getAllOrders } from "@/lib/db";
import { Container, Heading } from "@chakra-ui/react";
import { Suspense } from "react";

export default async function Page() {
  const orders = await getAllOrders();

  return (
    <Container maxW="5xl" padding="1rem" spaceY="1rem">
      <Heading fontSize="xl" fontWeight="bold">
        Tra cứu đơn đặt
      </Heading>

      <Suspense fallback={<Fallback />}>
        <CheckOrderForm orders={orders} />
      </Suspense>
    </Container>
  );
}
