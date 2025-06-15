import { Anton } from "next/font/google";
import { Text } from "@chakra-ui/react";

const font = Anton({
  weight: ["400"],
  subsets: ["vietnamese"],
});

export default function Logo() {
  return (
    <Text
      lineHeight={0}
      color="#50C878"
      whiteSpace="nowrap"
      fontSize="xl"
      textTransform="uppercase"
      className={`${font.className}`}
    >
      Khứa Dương
    </Text>
  );
}
