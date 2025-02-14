"use client";

import { useEffect, useState } from "react";
import { Field } from "./field";
import { Flex, Input } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "./data-list";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { EmptyState } from "./empty-state";

const vietnamPhoneRegex =
  /^(?:(?:\+84|84|0)?(?:3[2-9]|5[2689]|7[0689]|8[1-9]|9[0-4689]))\d{7}$/;

const schema = Yup.object({
  phone: Yup.string()
    .required("Số điện thoại không được để trống")
    .matches(vietnamPhoneRegex, "Số điện thoại không hợp lệ"),
});

export default function CheckOrderForm({ orders }: { orders: IOrder[] }) {
  const [userOrder, setUserOrder] = useState<IOrder[] | undefined>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const p = searchParams.get("phone") || "";
    setPhone(p);
    if (p) { 
      const checkPhone = p.charAt(0) === "0" ? p.slice(1) : p;
      setUserOrder(orders.filter((order) => order.phone === checkPhone));
    }
  }, [orders, searchParams]);

  const handleSearch = () => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams);
    if (phone) {
      params.set("phone", phone);
    } else {
      params.delete("phone");
    }
    setIsLoading(false);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Flex direction="column" gap="1rem">
      <Flex direction="column" gap="1rem" asChild>
        <form onSubmit={handleSubmit(handleSearch)}>
          <Field
            label="Tra cứu bằng điện thoại"
            invalid={Boolean(errors.phone)}
            errorText={errors.phone?.message}
          >
            <Input
              {...register("phone")}
              name="phone"
              rounded="lg"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="Nhập số điện thoại"
            />
          </Field>
          <Button
            type="submit"
            colorScheme="primary"
            size="lg"
            loading={isLoading}
            rounded="xl"
          >
            Tra cứu
          </Button>
        </form>
      </Flex>
      {userOrder ? (
        userOrder.length > 0 ? (
          <Flex divideY="1px" direction="column">
            {userOrder.map((order) => (
              <DataListRoot
                key={order.id}
                paddingY="1rem"
                orientation="horizontal"
              >
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
        ) : (
          <EmptyState
            title="Không có đơn hàng nào"
            description="Không có thông tin về đơn hàng của bạn"
          />
        )
      ) : null}
    </Flex>
  );
}
