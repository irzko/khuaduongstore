interface ICart {
  slug: string;
  quantity: number;
}

interface IProduct {
  name: string;
  detail: IProductDetail[];
}

interface IProductDetail {
  type: string;
  price: number;
  discountedPrice: number;
  tags: string;
  brand: string;
  image: string;
  stock: number;
  category: string;
  description: string;
}

interface IOrder {
  id: string;
  timestamp: string;
  unitPrice: number;
  totalPrice: number;
  quantity: string;
  productId: string;
  name: string;
  phone: string;
  address: string;
  status: string;
}

interface IContact {
  id: string;
  method: string;
  href: string;
  value: string;
}
