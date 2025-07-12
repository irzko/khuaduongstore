import Link from "next/link";
import { IconButton, Flex, Box, Container } from "@chakra-ui/react";
import SideBar from "@/components/sidebar";
import CartButton from "@/components/ui/cart-button";
import { LuSearch } from "react-icons/lu";
import Logo from "@/components/ui/logo";
import Banner from "@/components/ui/banner";
import { getAllBanners } from "@/lib/db";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bannerImageUrlList = await getAllBanners();
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
          // backgroundColor={{
          //  base: "#fff",
          //  _dark: "#000",
          // }}
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
      <Container maxW="5xl" spaceY="0.5rem" padding="0">
        <Banner
          imageUrlList={bannerImageUrlList.map((banner) => banner.imageUrl) || []}
        />
        {children}
      </Container>

      <Box paddingY="2rem" />
    </>
  );
}
