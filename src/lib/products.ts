import type { Product } from "./types";

/**
 * Catálogo otimizado para impressão RÁPIDA (PLA, 0.2–0.28mm, ~30–120 min).
 * Ideal para produção em massa até 4/08 e entrega no Dia dos Pais.
 */
export const products: Product[] = [
  {
    id: "placa-melhor-pai",
    name: 'Placa "Melhor Pai"',
    short: "Placa de mesa personalizada",
    description:
      "Placa 3D premium para mesa ou prateleira. Nome do pai em relevo. Impressão rápida, acabamento liso. O clássico que mais vende.",
    price: 49.9,
    compareAt: 69.9,
    printMinutes: 45,
    badge: "Mais vendido",
    emoji: "🏆",
    popular: true,
    colorOptions: ["Preto", "Azul marinho", "Dourado", "Cinza"],
    features: ["~12×8 cm", "Nome em relevo", "Base estável", "Pronto em 45 min"],
    personalizations: [
      {
        key: "nome",
        label: "Nome do pai",
        placeholder: "Ex: Carlos",
        maxLength: 18,
        required: true,
      },
      {
        key: "subtitulo",
        label: "Frase (opcional)",
        placeholder: "Ex: Meu herói",
        maxLength: 28,
      },
    ],
  },
  {
    id: "chaveiro-inicial",
    name: "Chaveiro Inicial 3D",
    short: "Inicial do pai + coração",
    description:
      "Chaveiro com a inicial do pai e detalhe de coração. Super leve, barato e perfeito para impulsionar ticket médio (upsell).",
    price: 29.9,
    compareAt: 39.9,
    printMinutes: 25,
    badge: "Rápido",
    emoji: "🔑",
    colorOptions: ["Preto", "Azul", "Vermelho", "Verde"],
    features: ["~5 cm", "Argola inclusa", "25 min de print", "Leve e resistente"],
    personalizations: [
      {
        key: "inicial",
        label: "Inicial (1 letra)",
        placeholder: "Ex: H",
        maxLength: 1,
        required: true,
      },
    ],
  },
  {
    id: "trofeu-pai-ano",
    name: 'Troféu "Pai do Ano"',
    short: "Mini troféu personalizado",
    description:
      "Mini troféu com base e placa. Visual premium, ideal para presentear com humor e carinho. Impressão em duas peças (cola em 2 min).",
    price: 64.9,
    compareAt: 89.9,
    printMinutes: 90,
    badge: "Premium",
    emoji: "🥇",
    popular: true,
    colorOptions: ["Preto + dourado", "Azul + prata", "Verde + branco"],
    features: ["~15 cm altura", "Base pesada", "Nome gravado", "Foto-ready"],
    personalizations: [
      {
        key: "nome",
        label: "Nome do pai",
        placeholder: "Ex: Roberto",
        maxLength: 16,
        required: true,
      },
      {
        key: "ano",
        label: "Ano",
        placeholder: "2026",
        maxLength: 4,
        required: true,
      },
    ],
  },
  {
    id: "suporte-celular",
    name: "Suporte de Celular Pai",
    short: "Stand útil + mensagem",
    description:
      "Suporte ergonômico para celular com mensagem gravada. Presente útil que ele usa todo dia — zero risco de ficar na gaveta.",
    price: 59.9,
    compareAt: 79.9,
    printMinutes: 70,
    emoji: "📱",
    colorOptions: ["Preto", "Cinza chumbo", "Azul marinho"],
    features: ["Cabe qualquer phone", "Ângulo ideal", "Mensagem gravada", "Anti-derrapante"],
    personalizations: [
      {
        key: "mensagem",
        label: "Mensagem (frente)",
        placeholder: "Ex: Te amo, pai",
        maxLength: 22,
        required: true,
      },
    ],
  },
  {
    id: "kit-heroi",
    name: "Kit Herói do Lar",
    short: "Placa + chaveiro juntos",
    description:
      "Combo matador: placa personalizada + chaveiro com inicial. Ticket maior, custo de frete diluído, cliente feliz.",
    price: 69.9,
    compareAt: 99.8,
    printMinutes: 70,
    badge: "Melhor custo",
    emoji: "🎁",
    popular: true,
    colorOptions: ["Preto", "Azul marinho", "Combo misto"],
    features: ["2 itens", "Economia de R$30", "Embalagem presente", "Print ~70 min"],
    personalizations: [
      {
        key: "nome",
        label: "Nome do pai (placa)",
        placeholder: "Ex: André",
        maxLength: 18,
        required: true,
      },
      {
        key: "inicial",
        label: "Inicial (chaveiro)",
        placeholder: "Ex: A",
        maxLength: 1,
        required: true,
      },
    ],
  },
  {
    id: "porta-retrato",
    name: 'Porta-retrato "Meu Herói"',
    short: "Moldura 3D para foto 10×15",
    description:
      "Moldura 3D para foto 10×15 com frase na base. Cliente manda a foto ou coloca depois. Emocional e alto valor percebido.",
    price: 74.9,
    compareAt: 99.9,
    printMinutes: 100,
    emoji: "🖼️",
    colorOptions: ["Preto", "Branco", "Madeira (PLA wood)"],
    features: ["Foto 10×15", "Frase na base", "Estável", "Embalagem rígida"],
    personalizations: [
      {
        key: "frase",
        label: "Frase na base",
        placeholder: "Ex: Meu herói",
        maxLength: 24,
        required: true,
      },
      {
        key: "nome",
        label: "Nome (opcional)",
        placeholder: "Ex: Pai",
        maxLength: 14,
      },
    ],
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function estimatePrintHours(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}min` : `${h}h`;
}
