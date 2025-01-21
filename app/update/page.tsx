import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default function UpdatePage() {
  async function updateData() {
    "use server";
    revalidateTag("products");
    redirect("/");
  }
  return (
    <form action={updateData} autoComplete="off">
      <button>Cập nhật</button>
    </form>
  );
}
