import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button, Flex, IconButton } from "@chakra-ui/react";

import { LuMenu } from "react-icons/lu";
import Link from "next/link";
import ContactInfomation from "./ui/contact-infomation";
import Logo from "./ui/logo";

const SideBar = async () => {
  return (
    <DrawerRoot size="md">
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton rounded="lg" variant="ghost">
          <LuMenu />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerCloseTrigger />
        <DrawerHeader>
          <DrawerTitle>
            <Logo />
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody autoFocus={false}>
          <DrawerActionTrigger asChild>
            <Button justifyContent="start" w="full" variant="ghost" asChild>
              <Link href="/check-order">Tra cứu đơn đặt</Link>
            </Button>
          </DrawerActionTrigger>
        </DrawerBody>
        <DrawerFooter>
          <Flex w="full">
            <ContactInfomation />
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default SideBar;
