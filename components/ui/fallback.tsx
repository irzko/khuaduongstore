import { Flex, Spinner } from "@chakra-ui/react";

export default function Fallback() {
  return (
    <Flex
      position="absolute"
      inset={0}
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="lg" />
    </Flex>
  );
}
