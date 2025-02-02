"use client";
import { Flex } from "@chakra-ui/react/flex";
import {
  Card,
  Grid,
  IconButton,
  Input,
  Image,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { LuArrowLeft, LuSearch } from "react-icons/lu";
import Link from "next/link";
import { useState } from "react";
import slugify from "slugify";
import NextLink from "next/link";
import NextImage from "next/image";
import fuzzy from "fuzzy";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useDebouncedCallback } from "use-debounce";
import { Suspense } from "react";
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu
    .replace(/[đĐ]/g, "d") // Xử lý chữ đ
    .replace(/[^a-z0-9\s]/g, " ") // Chỉ giữ lại chữ cái, số và khoảng trắng
    .replace(/\s+/g, " ") // Chuẩn hóa khoảng trắng
    .trim();
}

const options = {
  extract: function (el: IProduct) {
    return normalizeString(el.name);
  },
};

export default function SearchProductForm({
  products,
}: {
  products: IProduct[];
}) {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      const results = fuzzy.filter(normalizeString(term), products, options);
      const matches = results.map(function (el) {
        return el.original;
      });
      setFilteredProducts(matches);
    } else {
      params.delete("query");
      setFilteredProducts([]);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <>
      <Flex
        position="sticky"
        inset="0"
        zIndex="40"
        backgroundColor={{
          base: "white",
          _dark: "black",
        }}
        height="auto"
        justifyContent="center"
        alignItems="center"
        // shadow="sm"
      >
        <Flex
          paddingX="1rem"
          justifyContent="space-between"
          width="full"
          height="4rem"
          gap="1rem"
          maxWidth="1024px"
          alignItems="center"
        >
          <Flex gap="0.5rem" alignItems="center" width="full">
            <IconButton variant="ghost" aria-label="Back" rounded="lg" asChild>
              <Link href="/">
                <LuArrowLeft />
              </Link>
            </IconButton>
            <InputGroup width="full" startElement={<LuSearch />}>
              <Input
                rounded="xl"
                ps="2.5rem"
                variant="subtle"
                placeholder="Tìm kiếm"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get("query")?.toString()}
              />
            </InputGroup>
          </Flex>
        </Flex>
      </Flex>
      <Container maxW="5xl" padding="1rem" spaceY="1rem">
        <Grid
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(4, 1fr)",
            "repeat(6, 1fr)",
            "repeat(6, 1fr)",
          ]}
          gap="0.5rem"
        >
          <Suspense fallback={<div>Loading...</div>}>
            {filteredProducts.map((product) => (
              <Card.Root key={product.id} asChild overflow="hidden">
                <NextLink
                  href={`/${slugify(product.name, {
                    replacement: "-",
                    remove: undefined,
                    lower: true,
                    strict: true,
                    locale: "vi",
                    trim: true,
                  })}-${product.id}.html`}
                >
                  <Flex position="relative" aspectRatio={1}>
                    <Image asChild alt={product.name}>
                      <NextImage
                        src={product.image.split("\n")[0] || "/no-image.jpg"}
                        alt={product.name}
                        style={{ objectFit: "cover" }}
                        fill
                        unoptimized
                      />
                    </Image>
                  </Flex>
                  <Card.Body
                    gap="0.5rem"
                    padding="0.5rem"
                    direction="col"
                    justifyContent="space-between"
                  >
                    <Heading lineClamp={2} size="md">
                      {product.name}
                    </Heading>
                    <Text fontSize="md" color="red.500" fontWeight="bold">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </Text>
                  </Card.Body>
                </NextLink>
              </Card.Root>
            ))}
          </Suspense>
        </Grid>
      </Container>
    </>
  );
}
