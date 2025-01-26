import { Flex } from "@chakra-ui/react/flex";
import { IconButton, Input } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { LuArrowLeft, LuSearch } from "react-icons/lu";
import Link from "next/link";

export default function Page() {
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
          <Flex gap="0.5rem" alignItems="center" width="full">
            <IconButton variant="ghost" aria-label="Back" rounded="lg" asChild>
              <Link href="/">
                <LuArrowLeft />
              </Link>
            </IconButton>
            <InputGroup width="full" startElement={<LuSearch />}>
              <Input
                rounded="xl"
                ps="2.5rem"
                variant="subtle"
                placeholder="Tìm kiếm"
              />
            </InputGroup>
            {/* <AvatarMenu /> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
