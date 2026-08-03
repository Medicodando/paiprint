"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/config";

type Parts = { d: number; h: number; m: number; s: number; ended: boolean };

function calc(): Parts {
  const end = new Date(site.salesDeadline).getTime();
  const now = Date.now();
  const diff = end - now;
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, ended: true };
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s, ended: false };
}

export function Countdown({ compact = false }: { compact?: boolean }) {
  const [t, setT] = useState<Parts | null>(null);

  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!t) {
    return (
      <div className="h-14 animate-pulse rounded-xl bg-white/10" aria-hidden />
    );
  }

  if (t.ended) {
    return (
      <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-center text-sm font-medium text-amber-200">
        Prazo de pedidos Dia dos Pais encerrado — fale no WhatsApp para fila extra
      </div>
    );
  }

  const cells = [
    { label: "dias", value: t.d },
    { label: "hrs", value: t.h },
    { label: "min", value: t.m },
    { label: "seg", value: t.s },
  ];

  return (
    <div
      className={
        compact
          ? "flex items-center gap-2"
          : "flex flex-col items-center gap-2 sm:flex-row sm:gap-4"
      }
    >
      {!compact && (
        <p className="text-sm font-medium text-amber-200/90">
          ⏰ Peça até <strong>4/08</strong> · entrega pro Dia dos Pais
        </p>
      )}
      <div className="flex gap-1.5">
        {cells.map((c) => (
          <div
            key={c.label}
            className="min-w-[3.25rem] rounded-lg bg-black/40 px-2 py-1.5 text-center ring-1 ring-white/10"
          >
            <div className="font-mono text-lg font-bold tabular-nums text-white leading-none">
              {String(c.value).padStart(2, "0")}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-white/50">
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
