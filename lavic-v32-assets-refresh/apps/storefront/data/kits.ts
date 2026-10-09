export type Kit = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  priceCents: number;
};

export const kits: Kit[] = [
  {
    id: "kit_discovery",
    slug: "descoberta",
    name: "Kit Descoberta",
    description: "Uma seleção demonstrativa com a linguagem visual da LaVic para apresentar o universo da marca.",
    image: "/products/lavic-limao-composition.jpg",
    priceCents: 5490,
  },
  {
    id: "kit_celebracao",
    slug: "celebracao",
    name: "Kit Celebração",
    description: "Uma composição especial para ocasiões, presentes e ativações com presença visual marcante.",
    image: "/products/lavic-espumante-composition.jpg",
    priceCents: 7490,
  }
];
