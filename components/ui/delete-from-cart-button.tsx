import React, { useContext } from "react";
import { Button } from "./button";
import CartContext from "@/context/cart-context";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuTrash } from "react-icons/lu";
import { IconButton } from "@chakra-ui/react";

export default function DeleteFromCartButton({
  productId,
}: {
  productId: string;
}) {
  const { setCarts } = useContext(CartContext);

  const handleClick = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartObj = JSON.parse(cart) as ICart[];
      const newCart = cartObj.filter((cart) => cart.id !== productId);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCarts(newCart);
    }
  };
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <IconButton colorPalette="red" size="sm" rounded="lg">
          <LuTrash />
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa sản phẩm</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng không?</p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" rounded="lg">
              Huỷ
            </Button>
          </DialogActionTrigger>
          <Button onClick={handleClick} colorPalette="red" rounded="lg">
            Xóa
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
