"use client";

import { useEffect, useState } from "react";
import { Field } from "./field";
import { Flex, Input } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "./data-list";

export default function CheckOrderForm({ orders }: { orders: IOrder[] }) {
  const [userOrder, setUserOrder] = useState<IOrder[]>([]);
  const [phone, setPhone] = useState("");
  useEffect(() => {
    setUserOrder(orders.filter((order) => order.phone === phone));
  }, [orders, phone]);

  return (
    <Flex direction="column" gap="1rem">
      <Flex direction="column" gap="1rem">
        <Field label="Tra cứu bằng điện thoại">
          <Input
            name="phone"
            rounded="lg"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            placeholder="Nhập số điện thoại"
          />
        </Field>
      </Flex>
      <Flex divideY="1px" direction="column">
        {userOrder.map((order) => (
          <DataListRoot key={order.id} paddingY="1rem" orientation="horizontal">
            <DataListItem label="Mã đơn đặt" value={order.id} />
            <DataListItem label="Thời gian đặt" value={order.timestamp} />
            <DataListItem
              key={order.id}
              label="Trang thái"
              value={order.status}
            />
          </DataListRoot>
        ))}
      </Flex>
    </Flex>
  );
}
