import Link from "next/link";
import { Button, Flex, Box } from "@chakra-ui/react";
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
        paddingX="1rem"
        justifyContent="center"
        width="full"
        height="2.5rem"
        backdropFilter="blur(16px) saturate(1.5)"
        backgroundColor={{
          base: "rgba(245, 245, 245, 0.5)",
          _dark: "rgba(0, 0, 0, 0.7)",
        }}
        maxWidth="1024px"
        alignItems="center"
        mx="auto"
        borderBottomWidth="1px"
      >
        <Flex gapX="1rem">
          <Flex gap="0.25rem" alignItems="end" asChild>
            <Link href="/">
              <Logo />
            </Link>
          </Flex>
        </Flex>
      </Flex>
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
          backdropFilter="blur(16px) saturate(1.5)"
          backgroundColor={{
            base: "rgba(245, 245, 245, 0.5)",
            _dark: "rgba(0, 0, 0, 0.7)",
          }}
          justifyContent="space-between"
          width="full"
          height="3.5rem"
          gap="1rem"
          maxWidth="1024px"
          alignItems="center"
        >
          <SideBar />
          <Box flexBasis="100%">
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
              <Link href="/search">
                <LuSearch /> Tìm kiếm sản phẩm
              </Link>
            </Button>
          </Box>
          <Flex alignItems="center">
            {/* <IconButton variant="ghost" rounded="lg" asChild hideFrom="md">
              <Link href="/search">
                <LuSearch />
              </Link>
            </IconButton> */}

            <CartButton />
          </Flex>
        </Flex>
      </Flex>
      {children}
    </>
  );
}
