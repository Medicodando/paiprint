"use client";

import Link from "next/link";
import { site, whatsappLink } from "@/lib/config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1220]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 text-sm text-black shadow-lg shadow-amber-500/20">
            3D
          </span>
          <span className="text-white">
            Pai<span className="text-amber-400">Print</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/70 sm:flex">
          <a href="#produtos" className="hover:text-white transition">
            Presentes
          </a>
          <a href="#como-funciona" className="hover:text-white transition">
            Como funciona
          </a>
          <a href="#faq" className="hover:text-white transition">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink(
              `Oi! Quero um presente 3D pro Dia dos Pais no ${site.name} 🎁`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-emerald-400 sm:inline-flex"
          >
            WhatsApp
          </a>
          <Link
            href="/pedido"
            className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 text-sm font-semibold text-black shadow-lg shadow-amber-500/25 hover:brightness-110"
          >
            Pedir agora
          </Link>
        </div>
      </div>
    </header>
  );
}
