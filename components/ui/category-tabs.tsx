import { getGroupedProducts } from "@/lib/db";
import { ScrollableCategories } from "./scrollable-categories";

export default async function CategoryTabs({ slug }: { slug: string }) {
  const products = await getGroupedProducts();
  const distinctCategories = Array.from(
    new Set(products.map((product) => product.detail[0].category || "Khác")),
  );
  return (
    <ScrollableCategories categories={distinctCategories} currentSlug={slug} />
  );
}
