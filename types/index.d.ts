interface ICart {
  slug: string;
  quantity: number;
  types: string;
}

interface IProduct {
  name: string | null;
  types: string | null;
  price: number | null;
  discountedPrice: number | null;
  tags: string | null;
  brand: string | null;
  image: string | null;
  stock: number | null;
  category: string | null;
  description: string | null;
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
