interface ICart {
  slug: string;
  quantity: number;
  type: string;
}

interface IProduct {
  name: string | null;
  type: string | null;
  price: number | null;
  discountedPrice: number | null;
  tags: string | null;
  brand: string | null;
  image: string | null;
  stock: number | null;
  category: string | null;
  description: string | null;
}

interface IOrder {
  id: string;
  timestamp: string;
  type: string;
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
