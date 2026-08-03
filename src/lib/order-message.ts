import { formatBRL, site } from "./config";
import type { Order } from "./types";

export function buildWhatsAppMessage(order: Order): string {
  const lines: string[] = [
    `🎁 *Novo pedido ${site.name}*`,
    `Pedido: *${order.id}*`,
    ``,
    `👤 *Cliente*`,
    `Nome: ${order.customer.name}`,
    `WhatsApp: ${order.customer.phone}`,
    order.customer.email ? `Email: ${order.customer.email}` : "",
    `Cidade: ${order.customer.city}`,
    `Entrega: ${order.customer.delivery === "retirada" ? "Retirada" : "Entrega"}`,
    order.customer.address ? `Endereço: ${order.customer.address}` : "",
    ``,
    `📦 *Itens*`,
  ];

  for (const item of order.items) {
    lines.push(`• ${item.quantity}x ${item.productName} (${formatBRL(item.price)})`);
    lines.push(`  Cor: ${item.color}`);
    for (const [k, v] of Object.entries(item.personalizations)) {
      if (v) lines.push(`  ${k}: ${v}`);
    }
  }

  lines.push(``);
  lines.push(`Subtotal: ${formatBRL(order.subtotal)}`);
  lines.push(`Frete: ${order.shipping === 0 ? "GRÁTIS" : formatBRL(order.shipping)}`);
  lines.push(`*Total: ${formatBRL(order.total)}*`);
  lines.push(``);
  lines.push(`💳 PIX: ${site.pixKey}`);
  lines.push(`Nome: ${site.pixName}`);
  lines.push(``);
  lines.push(`Envie o comprovante neste chat para confirmar a produção 🖨️`);

  if (order.giftMessage) {
    lines.push(``);
    lines.push(`💌 Mensagem de presente: "${order.giftMessage}"`);
  }
  if (order.notes) {
    lines.push(``);
    lines.push(`📝 Obs: ${order.notes}`);
  }

  return lines.filter(Boolean).join("\n");
}

export function buildCustomerConfirmMessage(order: Order): string {
  return [
    `Olá! Acabei de pedir no *${site.name}* 🎁`,
    `Pedido: *${order.id}*`,
    `Total: *${formatBRL(order.total)}*`,
    ``,
    `Vou enviar o comprovante PIX agora.`,
    `Chave: ${site.pixKey}`,
  ].join("\n");
}
