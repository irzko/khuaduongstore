"use client";
import { Flex, Text, Badge } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import slugify from "slugify";

interface ScrollableCategoriesProps {
  categories: string[];
  currentSlug: string;
}

export function ScrollableCategories({
  categories,
  currentSlug,
}: ScrollableCategoriesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Xử lý scroll event
  const scrollSelectedToCenter = () => {
    if (selectedItemRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const item = selectedItemRef.current;

      const containerWidth = container.offsetWidth;
      const itemWidth = item.offsetWidth;
      const itemLeft = item.offsetLeft;

      const centerPosition = itemLeft - containerWidth / 2 + itemWidth / 2;

      container.scrollTo({
        left: centerPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollSelectedToCenter();
  }, [pathname]);

  return (
    <Flex
      ref={scrollContainerRef}
      // position="sticky"
      // top="3.5rem"
      zIndex={10}
      whiteSpace="nowrap"
      scrollbar="hidden"
      overflowX="auto"
      paddingY="0.5rem"
    >
      <div ref={currentSlug === "/" ? selectedItemRef : null}>
        <Badge
          variant={currentSlug === "/" ? "solid" : "plain"}
          size="lg"
          rounded="full"
          asChild
        >
          <NextLink href="/">
            <Text fontWeight="semibold">Tất cả</Text>
          </NextLink>
        </Badge>
      </div>

      {categories.map((category) => (
        <div
          key={category}
          ref={
            currentSlug ===
            slugify(category, {
              replacement: "-",
              remove: undefined,
              lower: true,
              strict: true,
              locale: "vi",
              trim: true,
            })
              ? selectedItemRef
              : null
          }
        >
          <Badge
            asChild
            size="lg"
            rounded="full"
            variant={
              currentSlug ===
              slugify(category, {
                replacement: "-",
                remove: undefined,
                lower: true,
                strict: true,
                locale: "vi",
                trim: true,
              })
                ? "solid"
                : "plain"
            }
          >
            <NextLink
              href={`/danh-muc/${slugify(category, {
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
          </Badge>
        </div>
      ))}
    </Flex>
  );
}
