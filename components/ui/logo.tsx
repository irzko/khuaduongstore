import { MuseoModerno } from "next/font/google";
import { Text } from "@chakra-ui/react";

const font = MuseoModerno({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["vietnamese"],
});

export default function Logo() {
  return (
    <Text
      lineHeight={0}
      whiteSpace="nowrap"
      fontSize="xl"
      fontWeight="bold"
      textTransform="uppercase"
      className={`${font.className}`}
    >
      Khứa Dương
    </Text>
  );
}
