import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
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
