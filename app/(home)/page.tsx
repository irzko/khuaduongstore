import { Grid, Container } from "@chakra-ui/react";
import { getAllProducts } from "@/lib/db";
import CategoryTabs from "@/components/ui/category-tabs";
import ProductCard from "@/components/ui/product-card";
import createSlug from "@/lib/createSlug";


export default async function Home() {
  const products = await getAllProducts();
  const groupedProducts = products.reduce((acc, product) => {
    // Tạo chi tiết sản phẩm mới, bỏ qua trường name
    const { name, ...detail } = product;
    
    // Chuyển đổi type từ string sang object
    const typeObj = detail.type?.split('\n').reduce((typeAcc, item) => {
      const [key, value] = item.split(':').map(s => s.trim());
      return { ...typeAcc, [key]: value };
    }, {}) || {};
    
    // Cập nhật detail với type mới
    const updatedDetail = { ...detail, type: typeObj };

    // Kiểm tra xem sản phẩm đã tồn tại chưa
    if (!acc[name]) {
      acc[name] = {
        name,
        detail: [updatedDetail]
      };
    } else {
      acc[name].detail.push(updatedDetail);
    }
    
    return acc;
  }, {} as Record<string, { name: string; detail: Array<Omit<IProduct, 'name'> & { type: Record<string, string> }> }>);




  return (
    <Container maxW="5xl" padding="1rem" spaceY="1rem">
      <CategoryTabs slug="/" />
      <Grid
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(4, 1fr)",
          "repeat(6, 1fr)",
          "repeat(6, 1fr)",
        ]}
        gap="1rem"
      >
        {products.reverse().map((product) => (
          <ProductCard key={createSlug(product.name)} product={product} />
        ))}
      </Grid>
    </Container>
  );
}
