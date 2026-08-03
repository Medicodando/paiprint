export type ProductId =
  | "placa-melhor-pai"
  | "chaveiro-inicial"
  | "trofeu-pai-ano"
  | "suporte-celular"
  | "kit-heroi"
  | "porta-retrato";

export type Product = {
  id: ProductId;
  name: string;
  short: string;
  description: string;
  price: number;
  compareAt?: number;
  printMinutes: number;
  badge?: string;
  emoji: string;
  personalizations: PersonalizationField[];
  features: string[];
  colorOptions: string[];
  popular?: boolean;
};

export type PersonalizationField = {
  key: string;
  label: string;
  placeholder: string;
  maxLength: number;
  required?: boolean;
};

export type OrderStatus =
  | "novo"
  | "pago"
  | "imprimindo"
  | "pronto"
  | "enviado"
  | "cancelado";

export type OrderItem = {
  productId: ProductId;
  productName: string;
  price: number;
  color: string;
  personalizations: Record<string, string>;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    name: string;
    phone: string;
    email?: string;
    city: string;
    address?: string;
    delivery: "retirada" | "entrega";
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  notes?: string;
  giftMessage?: string;
};

export type CreateOrderInput = Omit<Order, "id" | "createdAt" | "status">;
