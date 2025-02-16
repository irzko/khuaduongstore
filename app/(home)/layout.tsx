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
          backdropFilter="blur(16px) saturate(1.5)"
          backgroundColor={{
            base: "rgba(245, 245, 245, 0.5)",
            _dark: "rgba(0, 0, 0, 0.7)",
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
            variant="ghost"
            rounded="lg"
            backgroundColor={{
              base: "rgba(0, 0, 0, 0.1)",
              _dark: "rgba(255, 255, 255, 0.1)",
            }}
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
