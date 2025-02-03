import { getAllContacts } from "@/lib/db";
import { Flex, Heading, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaPhone } from "react-icons/fa";
import { SiFacebook, SiZalo } from "react-icons/si";

const icon = {
  "1": <FaPhone />,
  "2": <SiZalo />,
  "3": <SiFacebook />,
};

export default async function ContactInfomation() {
  const contact = await getAllContacts();
  return (
    <>
      <Flex direction="column" gap="0.5rem" padding="1rem">
        <Heading fontSize="md">Liên hệ hỗ trợ</Heading>
        <Flex gap="1rem" alignItems="center">
          {contact.slice(1).map((item) => (
            <Link key={item.id} fontSize="2xl" fontWeight="semibold" asChild>
              <NextLink href={item.href}>
                {icon[item.id as keyof typeof icon]}
              </NextLink>
            </Link>
          ))}
          <Flex gap="0.25rem" alignItems="center">
            <Text fontSize="xl">
              {icon[contact[0].id as keyof typeof icon]}
            </Text>
            <Link fontSize="sm" fontWeight="semibold" asChild>
              <NextLink href={contact[0].href}>{contact[0].value}</NextLink>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
