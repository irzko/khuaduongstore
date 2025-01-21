"use client";
import { createContext, Dispatch, SetStateAction } from "react";

const CartContext = createContext<{
  carts: ICart[];
  setCarts: Dispatch<SetStateAction<ICart[]>>;
}>({
  carts: [],
  setCarts: () => [],
});

export default CartContext;
