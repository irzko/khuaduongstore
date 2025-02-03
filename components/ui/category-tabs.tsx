import { getAllProducts } from "@/lib/db";
import { Flex, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import slugify from "slugify";

export default async function CategoryTabs({ slug }: { slug: string }) {
  const products = await getAllProducts();
  const distinctCategories = Array.from(
    new Set(products.map((product) => product.category))
  );
  return (
    <Flex
      gap="1rem"
      bg="white"
      zIndex={30}
      paddingY="0.5rem"
      position="sticky"
      top="3.5rem"
      whiteSpace="nowrap"
      scrollbar="hidden"
      overflowX="auto"
    >
      <Link
        variant={slug === "/" ? "underline" : "plain"}
        outline="none"
        asChild
      >
        <NextLink href="/">
          <Text fontWeight="semibold">Tất cả</Text>
        </NextLink>
      </Link>
      {distinctCategories.map((category) => (
        <Link
          outline="none"
          key={category}
          asChild
          variant={
            slug ===
            slugify(category, {
              replacement: "-",
              remove: undefined,
              lower: true,
              strict: true,
              locale: "vi",
              trim: true,
            })
              ? "underline"
              : "plain"
          }
        >
          <NextLink
            href={`/category/${slugify(category, {
              replacement: "-",
              remove: undefined,
              lower: true,
              strict: true,
              locale: "vi",
              trim: true,
            })}`}
          >
            <Text fontWeight="semibold">{category}</Text>
          </NextLink>
        </Link>
      ))}
    </Flex>
  );
}
