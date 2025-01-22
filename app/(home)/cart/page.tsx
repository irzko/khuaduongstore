import CartList from "@/components/ui/cart-list";
import { getGSheet } from "@/lib/getGSheet";
import { Flex, VStack } from "@chakra-ui/react";
import { unstable_cache } from "next/cache";

const getProducts = unstable_cache(
  async () => {
    return (await getGSheet(
      "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
      "0"
    )) as unknown as IProduct[];
  },
  ["products"],
  { tags: ["products"] }
);

export default async function CartPage() {
  const products = await getProducts();

  return (
    <VStack>
      <Flex
        direction={{
          base: "column",
          md: "row",
        }}
        maxWidth="1024px"
        w="full"
      >
        <CartList products={products} />
      </Flex>
    </VStack>
  );
}
