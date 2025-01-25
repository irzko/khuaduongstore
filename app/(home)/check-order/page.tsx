import CheckOrderForm from "@/components/ui/check-order-form";
import { getAllOrders } from "@/lib/db";
import { Card, Container } from "@chakra-ui/react";

export default async function Page() {
  const orders = await getAllOrders();

  return (
    <Container maxW="5xl" padding="1rem" spaceY="1rem">
      <Card.Root rounded="lg">
        <Card.Header borderBottomWidth="1px" padding="1rem">
          <Card.Title fontSize="lg" fontWeight="bold">
            Tra cứu đơn đặt
          </Card.Title>
        </Card.Header>
        <Card.Body padding="1rem" divideY="1px">
          <CheckOrderForm orders={orders} />
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
