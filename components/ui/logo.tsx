import { Alfa_Slab_One } from "next/font/google";
import { Heading } from "@chakra-ui/react";

const font = Alfa_Slab_One({
  weight: ["400"],
  subsets: ["vietnamese"],
});

export default function Logo() {
  return (
    <Heading
      lineHeight={0}
      whiteSpace="nowrap"
      // color="white"
      size="2xl"
      className={`${font.className}`}
    >
      KHỨA DƯƠNG
    </Heading>
  );
}
