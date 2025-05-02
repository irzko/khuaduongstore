import CheckOrderForm from "@/components/ui/check-order-form";
import Fallback from "@/components/ui/fallback";
import { getAllOrders } from "@/lib/db";
import { Container, Heading, Flex } from "@chakra-ui/react";
import { Suspense } from "react";
import { IconButton } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

export default async function Page() {
  const orders = await getAllOrders();

  return (
    <Container maxW="5xl" padding="1rem" spaceY="1rem">
      <Flex gap="0.5rem" alignItems="center">
        <IconButton variant="ghost" aria-label="Back" rounded="lg" asChild>
          <Link href="/">
            <IoIosArrowBack />
          </Link>
        </IconButton>
        <Heading fontSize="md" fontWeight="bold">
          Tra cứu đơn đặt
        </Heading>
      </Flex>

      <Suspense fallback={<Fallback />}>
        <CheckOrderForm orders={orders} />
      </Suspense>
    </Container>
  );
}
