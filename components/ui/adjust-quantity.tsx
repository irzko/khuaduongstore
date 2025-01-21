import { Group, IconButton, Input } from "@chakra-ui/react";
import React from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

export default function AdjustQuantity({ quantity }: { quantity: number }) {
  return (
    <Group attached height="2rem">
      <IconButton h="full" variant="outline" size="sm">
        <LuMinus />
      </IconButton>
      <Input defaultValue={quantity} size="sm" />
      <IconButton h="full" variant="outline" size="sm">
        <LuPlus />
      </IconButton>
    </Group>
  );
}
