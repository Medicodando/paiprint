/** Configure via .env.local — defaults prontos para vender hoje */

export const site = {
  name: "PaiPrint",
  tagline: "Presentes 3D personalizados pro Dia dos Pais",
  description:
    "Impressão 3D rápida, personalizada com o nome do seu pai. Peça até 4/08 e receba a tempo do Dia dos Pais.",
  salesDeadline: "2026-08-04T23:59:59-03:00",
  fathersDay: "2026-08-09",
  deliveryPromise: "Entrega até 8/08 para presentes no dia 9",
  city: "Sua cidade",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5511999999999",
  pixKey: process.env.NEXT_PUBLIC_PIX_KEY || "seu-email@pix.com.br",
  pixName: process.env.NEXT_PUBLIC_PIX_NAME || "PaiPrint 3D",
  adminPassword: process.env.ADMIN_PASSWORD || "paiprint2026",
  currency: "BRL",
  freeShippingFrom: 120,
  shippingDefault: 15,
};

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
