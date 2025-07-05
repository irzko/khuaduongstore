
"use client";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import createSlug from "@/lib/createSlug";

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
  const [isAtTop, setIsAtTop] = useState(true);

  // Handle scroll event to change background color
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        setIsAtTop(scrollTop === 0);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

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
      position="sticky"
      top="0rem"
      zIndex={10}
      backgroundColor={isAtTop ? "#fff" : "transparent"}
      whiteSpace="nowrap"
      scrollbar="hidden"
      overflowX="auto"
      alignItems="center"
      paddingX="0.5rem"
      h="3rem"
      transition="background-color 0.2s ease"
    >
      <div ref={currentSlug === "/" ? selectedItemRef : null}>
        <Button
          variant="ghost"
          size="sm"
          rounded="full"
          paddingX="0.5rem"
          height="1.5rem"
          asChild
        >
          <div>
            <NextLink href="/">
              <Text
                fontWeight="bold"
                color={currentSlug === "/" ? "#000" : "gray.500"}
              >
                Tất cả
              </Text>
            </NextLink>
            <Box
              position="absolute"
              bottom="-0.75rem"
              insetX="0.5rem"
              height="2.5px"
              rounded="full"
              bgColor={currentSlug === "/" ? "#ff923f" : "transparent"}
            ></Box>
          </div>
        </Button>
      </div>

      {categories.map((category) => (
        <div
          key={category}
          ref={currentSlug === createSlug(category) ? selectedItemRef : null}
        >
          <Button
            asChild
            size="sm"
            position="relative"
            rounded="full"
            variant="ghost"
            paddingX="0.5rem"
            height="1.5rem"
          >
            <div>
              <NextLink href={`/danh-muc/${createSlug(category)}`}>
                <Text
                  fontWeight="bold"
                  color={
                    currentSlug === createSlug(category) ? "#000" : "gray.500"
                  }
                >
                  {category}
                </Text>
              </NextLink>
              <Box
                position="absolute"
                bottom="-0.75rem"
                insetX="0.5rem"
                height="2.5px"
                rounded="full"
                bgColor={
                  currentSlug === createSlug(category)
                    ? "#ff923f"
                    : "transparent"
                }
              ></Box>
            </div>
          </Button>
        </div>
      ))}
    </Flex>
  );
}
