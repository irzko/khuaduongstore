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
      whiteSpace="nowrap"
      fontSize="xl"
      className={`${font.className}`}
    >
      KHỨA DƯƠNG
    </Text>
  );
}
