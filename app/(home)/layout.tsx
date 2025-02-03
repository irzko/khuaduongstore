import Link from "next/link";
import { Button, Flex, IconButton } from "@chakra-ui/react";
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
        inset="0"
        zIndex="10"
        backdropFilter="blur(16px) saturate(1.5)"
        backgroundColor={{
          base: "rgba(245, 245, 245, 0.5)",
          _dark: "rgba(0, 0, 0, 0.7)",
        }}
        height="auto"
        justifyContent="center"
        alignItems="center"
        // shadow="sm"
      >
        <Flex
          paddingX="1rem"
          justifyContent="space-between"
          width="full"
          height="3.5rem"
          gap="1rem"
          maxWidth="1024px"
          alignItems="center"
        >
          <Flex gapX="1rem">
            <Flex gap="0.25rem" alignItems="end" asChild>
              <Link href="/">
                <Logo />
              </Link>
            </Flex>
          </Flex>
          <Button
            variant="subtle"
            rounded="lg"
            maxWidth="20rem"
            w="full"
            justifyContent="flex-start"
            color="gray.500"
            hideBelow="md"
            asChild
          >
            <Link href="/search">
              <LuSearch /> Tìm kiếm sản phẩm
            </Link>
          </Button>
          <Flex alignItems="center">
            <IconButton variant="ghost" rounded="lg" asChild hideFrom="md">
              <Link href="/search">
                <LuSearch />
              </Link>
            </IconButton>

            <CartButton />
            <SideBar />
          </Flex>
        </Flex>
      </Flex>
      {children}
    </>
  );
}
