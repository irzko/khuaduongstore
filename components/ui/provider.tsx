"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { CartProvider } from "./cart-provider";
export function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChakraProvider value={defaultSystem}>
      <CartProvider>{children}</CartProvider>
    </ChakraProvider>
  );
}
