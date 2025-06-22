import Link from "next/link";
import { IconButton, Flex, Box } from "@chakra-ui/react";
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
        // position="sticky"
        overflow="hidden"
        // top="0"
        // zIndex="40"
        height="auto"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          paddingX="1rem"
          paddingY="0.5rem"
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
            <Link href="/">
              <Logo />
            </Link>

            <Flex>
              <IconButton variant="ghost" asChild>
                <Link href="/tim-kiem">
                  <LuSearch />
                </Link>
              </IconButton>
              <Flex alignItems="center">
                <CartButton />
              </Flex>
              <SideBar />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {children}
      <Box paddingY="2rem" />
    </>
  );
}
