import { Container } from "@chakra-ui/react";
import { getGroupedProducts, getAllBanners } from "@/lib/db";
import CategoryTabs from "@/components/ui/category-tabs";
import ProductPagination from "@/components/ui/product-pagination";
import Banner from "@/components/ui/banner";

export default async function Home() {
  const products = await getGroupedProducts();
  const bannerImageUrlList = await getAllBanners();

  return (
    <Container maxW="5xl" spaceY="0.5rem" padding="0">
      <Banner
        imageUrlList={bannerImageUrlList.map((banner) => banner.imageUrl) || []}
      />
      <CategoryTabs slug="/" />
      <ProductPagination products={products} />
    </Container>
  );
}
