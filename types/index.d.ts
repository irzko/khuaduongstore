interface ICart {
  slug: string;
  quantity: number;
  types: string;
}

interface IProduct {
  name: string;
  types: string;
  price: number;
  discountedPrice: number;
  tags: string;
  brand: string;
  image: string;
  stock: number;
  category: string;
  description: string;
}

interface IGroupedProduct {
  name: string;
  detail: Omit<IProduct, "name">[];
}

interface IOrder {
  id: string;
  timestamp: string;
  types: string;
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
