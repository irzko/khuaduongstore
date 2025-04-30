import { getGSheet } from "./getGSheet";

export const getAllProducts = async (): Promise<IProduct[]> => {
  const products = await getGSheet(
    "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
    "0",
    "force-cache",
    { tags: ["products"] }
  );

  type Product = {
    "Tên sản phẩm": string;
    "Hình ảnh": string;
    "Đơn giá": string;
    "Mô tả": string;
    "Số lượng tồn": string;
    "Danh mục": string;
  };

  return products.map((product: Product) => ({
    name: product["Tên sản phẩm"],
    image: product["Hình ảnh"],
    price: Number(product["Đơn giá"]),
    description: product["Mô tả"],
    stock: Number(product["Số lượng tồn"]),
    category: product["Danh mục"],
  }));
};

export const getAllOrders = async (): Promise<IOrder[]> => {
  const orders = await getGSheet(
    "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
    "1595734372",
    "no-store"
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

export const getAllContacts = async (): Promise<IContact[]> => {
  const contacts = await getGSheet(
    "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
    "1197771900",
    "force-cache",
    { tags: ["contacts"] }
  );

  type Contact = {
    ID: string;
    "Phương thức": string;
    "Liên kết": string;
    "Hiển thị": string;
  };

  return contacts.map((contact: Contact) => ({
    id: contact["ID"],
    method: contact["Phương thức"],
    href: contact["Liên kết"],
    value: contact["Hiển thị"],
  }));
};
