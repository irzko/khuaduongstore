import { getAllContacts } from "@/lib/db";
import { Flex, Heading, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default async function ContactInfomation() {
  const contact = await getAllContacts();
  return (
    <>
      <Flex direction="column" gap="0.5rem" padding="1rem">
        <Heading fontSize="md">Hỗ trợ</Heading>
        <Flex direction="column">
          {contact.map((item) => (
            <Flex key={item.id} gap="0.25rem">
              <Text fontSize="sm">{item.method}:</Text>
              <Link fontSize="sm" fontWeight="semibold" asChild>
                <NextLink href={item.href}>{item.value}</NextLink>
              </Link>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </>
  );
}
