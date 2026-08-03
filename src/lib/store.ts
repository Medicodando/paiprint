import { promises as fs } from "fs";
import path from "path";
import type { CreateOrderInput, Order, OrderStatus } from "./types";

const DATA_DIR =
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
    ? path.join("/tmp", "paiprint-data")
    : path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

async function ensureStore() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.writeFile(ORDERS_FILE, "[]", "utf-8");
  }
}

async function readOrders(): Promise<Order[]> {
  await ensureStore();
  try {
    const raw = await fs.readFile(ORDERS_FILE, "utf-8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

async function writeOrders(orders: Order[]) {
  await ensureStore();
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

function generateId() {
  const d = new Date();
  const stamp = [
    d.getFullYear().toString().slice(2),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PP-${stamp}-${rand}`;
}

export async function listOrders(): Promise<Order[]> {
  const orders = await readOrders();
  return orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getOrder(id: string): Promise<Order | null> {
  const orders = await readOrders();
  return orders.find((o) => o.id === id) ?? null;
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const orders = await readOrders();
  const order: Order = {
    ...input,
    id: generateId(),
    createdAt: new Date().toISOString(),
    status: "novo",
  };
  orders.push(order);
  await writeOrders(orders);
  return order;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<Order | null> {
  const orders = await readOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx < 0) return null;
  orders[idx] = { ...orders[idx], status };
  await writeOrders(orders);
  return orders[idx];
}

export async function orderStats() {
  const orders = await readOrders();
  const active = orders.filter((o) => o.status !== "cancelado");
  return {
    total: orders.length,
    revenue: active.reduce((s, o) => s + o.total, 0),
    novos: orders.filter((o) => o.status === "novo").length,
    imprimindo: orders.filter((o) => o.status === "imprimindo").length,
    prontos: orders.filter((o) => o.status === "pronto").length,
  };
}
