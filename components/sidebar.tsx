import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IconButton } from "@chakra-ui/react";

import { LuMenu } from "react-icons/lu";
import Link from "next/link";

const SideBar = async () => {
  
  return (
    <DrawerRoot>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton rounded="lg" variant="ghost" size="sm">
          <LuMenu />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent roundedLeft="2xl">
        <DrawerCloseTrigger />
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <DrawerBody autoFocus={false}>
          <DrawerTrigger asChild>
            <Link href="/check-order">Tra cứu đơn đặt</Link>
          </DrawerTrigger>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default SideBar;
