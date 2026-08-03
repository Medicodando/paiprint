"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProductId } from "./types";
import { getProduct } from "./products";
import { site } from "./config";

export type CartItem = {
  key: string;
  productId: ProductId;
  color: string;
  personalizations: Record<string, string>;
  quantity: number;
};

type CartCtx = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "key">) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  shippingFor: (delivery: "retirada" | "entrega") => number;
};

const CartContext = createContext<CartCtx | null>(null);
const STORAGE_KEY = "paiprint-cart-v1";

function makeKey(item: Omit<CartItem, "key">) {
  return [
    item.productId,
    item.color,
    JSON.stringify(item.personalizations),
  ].join("|");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "key">) => {
    const key = makeKey(item);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key
            ? { ...i, quantity: Math.min(10, i.quantity + item.quantity) }
            : i
        );
      }
      return [...prev, { ...item, key }];
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const updateQty = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.key === key ? { ...i, quantity: Math.min(10, Math.max(0, quantity)) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () =>
      items.reduce((s, i) => {
        const p = getProduct(i.productId);
        return s + (p?.price || 0) * i.quantity;
      }, 0),
    [items]
  );

  const count = useMemo(
    () => items.reduce((s, i) => s + i.quantity, 0),
    [items]
  );

  const shippingFor = useCallback(
    (delivery: "retirada" | "entrega") => {
      if (delivery === "retirada") return 0;
      if (subtotal >= site.freeShippingFrom) return 0;
      return site.shippingDefault;
    },
    [subtotal]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clear,
      count,
      subtotal,
      shippingFor,
    }),
    [items, addItem, removeItem, updateQty, clear, count, subtotal, shippingFor]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
