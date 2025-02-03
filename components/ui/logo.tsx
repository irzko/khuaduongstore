import { Anton_SC } from "next/font/google";
import { Heading } from "@chakra-ui/react";

const font = Anton_SC({
  weight: ["400"],
  subsets: ["vietnamese"],
});

export default function Logo() {
  return (
    <Heading
      lineHeight={0}
      whiteSpace="nowrap"
      // color="white"
      size="lg"
      className={`${font.className}`}
    >
      KHỨA DƯƠNG
    </Heading>
  );
}
