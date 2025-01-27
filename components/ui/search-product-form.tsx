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
import { useCallback, useState } from "react";
import slugify from "slugify";
import NextLink from "next/link";
import NextImage from "next/image";
import debounce from "lodash.debounce";

export default function SearchProductForm({
  products,
}: {
  products: IProduct[];
}) {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const handleChange = useCallback(
    debounce((value: string) => {
      if (!value) {
        setFilteredProducts([]);
      } else {
        const filtered = products.filter((product) =>
          slugify(product.name, {
            remove: undefined,
            replacement: " ",
            lower: true,
            strict: true,
            locale: "vi",
            trim: true,
          }).includes(
            slugify(value, {
              replacement: " ",
              remove: undefined,
              lower: true,
              strict: true,
              locale: "vi",
              trim: true,
            })
          )
        );

        setFilteredProducts(filtered);
      }
    }, 300),
    [products]
  );

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
                  handleChange(e.target.value);
                }}
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
