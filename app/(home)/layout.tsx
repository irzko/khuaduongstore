import { Flex } from "@chakra-ui/react/flex";
import Link from "next/link";
import { Heading, IconButton, Input, Text } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import SideBar from "@/components/sidebar";
import { Anton } from "next/font/google";
import CartButton from "@/components/ui/cart-button";
import { LuSearch } from "react-icons/lu";

const anton = Anton({
  weight: ["400"],
  subsets: ["vietnamese"],
});

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
        zIndex="40"
        backgroundColor={{
          base: "white",
          _dark: "black",
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
          height="4rem"
          gap="1rem"
          maxWidth="1024px"
          alignItems="center"
        >
          <Flex gapX="1rem">
            <Flex gap="0.25rem" alignItems="end" asChild>
              <Link href="/">
                <Heading
                  whiteSpace="nowrap"
                  size="xl"
                  className={`${anton.className}`}
                >
                  KHỨA DƯƠNG
                </Heading>
                <Text as="span" fontSize="xl" fontWeight="400">
                  STORE
                </Text>
              </Link>
            </Flex>
          </Flex>
          <Flex gap="0.5rem" alignItems="center">
            <IconButton variant="ghost" rounded="lg" asChild hideFrom="md">
              <Link href="/search">
                <LuSearch />
              </Link>
            </IconButton>
            <InputGroup hideBelow="md" startElement={<LuSearch />}>
              <Input
                rounded="xl"
                ps="2.5rem"
                variant="subtle"
                placeholder="Tìm kiếm"
              />
            </InputGroup>
            {/* <AvatarMenu /> */}
            <CartButton />
            <SideBar />
          </Flex>
        </Flex>
      </Flex>
      {children}
    </>
  );
}
