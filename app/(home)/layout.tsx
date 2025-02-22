import Link from "next/link";
import { Button, Flex } from "@chakra-ui/react";
import SideBar from "@/components/sidebar";
import CartButton from "@/components/ui/cart-button";
import { LuSearch } from "react-icons/lu";
import Logo from "@/components/ui/logo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Flex
        position="sticky"
        overflow="hidden"
        top="0"
        zIndex="40"
        height="auto"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          paddingX="1rem"
          paddingY="1rem"
          backgroundColor={{
            base: "#fff",
            _dark: "#000",
          }}
          direction="column"
          width="full"
          gap="0.5rem"
          maxWidth="1024px"
          alignItems="center"
        >
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <SideBar />

            <Link href="/">
              <Logo />
            </Link>

            <Flex alignItems="center">
              <CartButton />
            </Flex>
          </Flex>

          <Button
            variant="surface"
            rounded="lg"
            maxWidth={{
              base: "full",
              md: "20rem",
            }}
            w="full"
            size={{ base: "sm", md: "md" }}
            justifyContent="flex-start"
            color="gray.500"
            // hideBelow="md"
            asChild
          >
            <Link href="/tim-kiem">
              <LuSearch /> Tìm kiếm sản phẩm
            </Link>
          </Button>
        </Flex>
      </Flex>
      {children}
    </>
  );
}
