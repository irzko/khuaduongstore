import { Button } from "@/components/ui/button";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default function UpdatePage() {
  async function updateData() {
    "use server";
    revalidateTag("products");
    redirect("/");
  }

  // update contact information
  async function updateContact() {
    "use server";
    revalidateTag("contacts");
    redirect("/");
  }

  // update banners
  async function updateBanners() {
    "use server";
    revalidateTag("banners");
    redirect("/");
  }
  return (
    <>
      <form action={updateData} autoComplete="off">
        <Button type="submit">Cập nhật sản phẩm</Button>
      </form>
      <form action={updateContact} autoComplete="off">
        <Button type="submit">Cập nhật thông tin liên hệ</Button>
      </form>
      <form action={updateBanners} autoComplete="off">
        <Button type="submit">Cập nhật banner</Button>
      </form>
    </>
  );
}
