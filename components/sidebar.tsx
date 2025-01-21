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
import { Grid, IconButton } from "@chakra-ui/react";

import { LuMenu } from "react-icons/lu";

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
          <Grid templateColumns={"repeat(2, 1fr)"} gap="1rem"></Grid>
        </DrawerBody>
        {/* <DrawerFooter>
          <UserItem />
        </DrawerFooter> */}
      </DrawerContent>
    </DrawerRoot>
  );
};

export default SideBar;
