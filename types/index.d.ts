interface ICart {
  id: string;
  quantity: number;
}

interface IProduct {
  id: string;
  name: string;
  price: number;
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
