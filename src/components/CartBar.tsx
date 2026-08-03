"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatBRL } from "@/lib/config";

export function CartBar() {
  const { count, subtotal } = useCart();
  if (count === 0) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <Link
        href="/pedido"
        className="pointer-events-auto flex w-full max-w-md items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3.5 text-black shadow-2xl shadow-amber-500/30 ring-1 ring-white/20 transition hover:brightness-105"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/15 text-sm font-bold">
            {count}
          </span>
          <span className="font-semibold">Finalizar pedido</span>
        </div>
        <span className="font-bold">{formatBRL(subtotal)}</span>
      </Link>
    </div>
  );
}
