import { getGSheet } from "./getGSheet";

export const getAllProducts = async (): Promise<IProduct[]> => {
  const products = await getGSheet(
    "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
    "0",
    "force-cache",
    { tags: ["products"] }
  );

  type Product = {
    "Mã sản phẩm": string;
    "Tên sản phẩm": string;
    "Hình ảnh": string;
    Giá: string;
    "Mô tả": string;
    "Số lượng tồn": string;
  };

  return products.map((product: Product) => ({
    id: product["Mã sản phẩm"],
    name: product["Tên sản phẩm"],
    image: product["Hình ảnh"],
    price: Number(product["Giá"]),
    description: product["Mô tả"],
    stock: Number(product["Số lượng tồn"]),
  }));
};

export const getAllOrders = async (): Promise<IOrder[]> => {
  const orders = await getGSheet(
    "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
    "1595734372"
  );

  type Order = {
    "Mã đơn đặt": string;
    "Thời gian đặt": string;
    "Địa chỉ": string;
    "Số điện thoại": string;
    "Tên khách hàng": string;
    "Mã sản phẩm": string;
    "Đơn giá": string;
    "Số lượng": string;
    "Thành tiền": string;
    "Trạng thái": string;
  };

  return orders.map((order: Order) => ({
    id: order["Mã đơn đặt"],
    timestamp: order["Thời gian đặt"],
    address: order["Địa chỉ"],
    phone: order["Số điện thoại"],
    name: order["Tên khách hàng"],
    productId: order["Mã sản phẩm"],
    unitPrice: Number(order["Đơn giá"]),
    quantity: Number(order["Số lượng"]),
    totalPrice: Number(order["Thành tiền"]),
    status: order["Trạng thái"],
  }));
};
