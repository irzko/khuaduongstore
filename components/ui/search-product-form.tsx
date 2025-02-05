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
import { useState, useEffect } from "react";
import slugify from "slugify";
import NextLink from "next/link";
import NextImage from "next/image";
import fuzzy from "fuzzy";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { normalizeString } from "@/lib/normalizeString";

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

  useEffect(() => {
    const search = searchParams.get("query") || "";
    if (search) {
      const results = fuzzy.filter(normalizeString(search), products, options);
      const matches = results.map(function (el) {
        return el.original;
      });
      setFilteredProducts(matches);
    } else {
      setFilteredProducts([]);
    }
  }, [products, searchParams]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <>
      <Flex
        position="sticky"
        inset="0"
        zIndex="10"
        height="auto"
        justifyContent="center"
        alignItems="center"
        // shadow="sm"
      >
        <Flex
          paddingX="1rem"
          justifyContent="space-between"
          width="full"
          height="3.5rem"
          gap="1rem"
          maxWidth="1024px"
          backdropFilter="blur(16px) saturate(1.5)"
          backgroundColor={{
            base: "rgba(245, 245, 245, 0.5)",
            _dark: "rgba(0, 0, 0, 0.7)",
          }}
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
                rounded="lg"
                ps="2.5rem"
                autoFocus
                backgroundColor={{
                  base: "rgba(245, 245, 245, 0.5)",
                  _dark: "rgba(0, 0, 0, 0.7)",
                }}
                size={{ base: "xs", md: "md" }}
                variant="outline"
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
        </Grid>
      </Container>
    </>
  );
}
