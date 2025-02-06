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
    <Flex direction="column">
      <Flex
        paddingX="1rem"
        justifyContent="center"
        width="full"
        height="2.5rem"
        backgroundColor={{
          base: "rgba(245, 245, 245, 0.5)",
          _dark: "rgba(0, 0, 0, 0.7)",
        }}
        // gap="1rem"
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
        insetX="0"
        top="0px"
        zIndex="10"
        height="auto"
        justifyContent="center"
        alignItems="center"
        // shadow="sm"
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
          // borderBottomWidth="1px"
        >
          <SideBar />

          <Button
            variant="surface"
            rounded="lg"
            backgroundColor={{
              base: "rgba(245, 245, 245, 0.5)",
              _dark: "rgba(0, 0, 0, 0.7)",
            }}
            size={{ base: "xs", md: "md" }}
            maxWidth={{
              base: "14rem",
              md: "20rem",
            }}
            w="full"
            justifyContent="flex-start"
            color="gray.500"
            // hideBelow="md"
            asChild
          >
            <Link href="/search">
              <LuSearch /> Tìm kiếm sản phẩm
            </Link>
          </Button>
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
    </Flex>
  );
}
