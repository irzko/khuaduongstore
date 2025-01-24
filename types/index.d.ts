interface ICart {
  id: string;
  quantity: number;
}

interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  remaining: string;
  description: string;
}

interface IOrder {
  id: string;
  timestamp: string;
  unitPrice: number;
  totalPrice: string;
  quantity: string;
  productId: string;
  name: string;
  phone: string;
  address: string;
  status: string;
}
