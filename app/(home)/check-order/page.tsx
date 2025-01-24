import CheckOrderForm from "@/components/ui/check-order-form";
import { getGSheet } from "@/lib/getGSheet";
import { Card, Container } from "@chakra-ui/react";

const getOthers = async (): Promise<IOrder[]> => {
  const orders = await getGSheet(
    "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
    "1595734372"
  );

  type Order = {
    "Mã đơn đặt": string;
    "Thời gian đặt": string;
    "Địa chỉ": string;
    "Số điện thoại": string;
    "Tên khách hàng": string;
    "Mã sản phẩm": string;
    "Đơn giá": string;
    "Số lượng": string;
    "Thành tiền": string;
    "Trạng thái": string;
  };

  return orders.map((order: Order) => ({
    id: order["Mã đơn đặt"],
    timestamp: order["Thời gian đặt"],
    address: order["Địa chỉ"],
    phone: order["Số điện thoại"],
    name: order["Tên khách hàng"],
    productId: order["Mã sản phẩm"],
    unitPrice: Number(order["Đơn giá"]),
    quantity: order["Số lượng"],
    totalPrice: order["Thành tiền"],
    status: order["Trạng thái"],
  }));
};

export default async function Page() {
  const orders = await getOthers();

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
