export const WHATSAPP_NUMBER = "5538999313930";

export const WHATSAPP_MESSAGE =
  "Olá, quero iniciar uma avaliação de projeto com a Rosane Paisagismo.";

export const portfolioCategories = [
  "Todos",
  "Estudo 3D",
  "Residencial",
  "Implantação orientada",
  "Fachadas e acessos",
];

const localAsset = (name) => `/brand/${name}`;

export const premiumProjects = [
  {
    slug: "estudo-3d-fachada-principal",
    title: "Estudo 3D de fachada principal",
    category: "Estudo 3D",
    location: "Projeto residencial selecionado",
    area: "Fachada e acesso social",
    scope: "Conceito botânico, estudo 3D e diretrizes executivas",
    cover: localAsset("PAISAGISMO-PRISCILLA-ROSANE_p6_i2.jpg"),
    gallery: [
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p2_i2.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p6_i2.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p8_i1.jpg"),
    ],
    summary:
      "Composição de entrada com leitura arquitetônica, privacidade e percurso de chegada.",
    challenge:
      "Criar impacto de chegada sem excesso visual, mantendo proporção entre arquitetura, vegetação e acessos.",
    solution:
      "A proposta organiza massas vegetais, textura de piso e pontos focais para reforçar escala, permanência e leitura do imóvel.",
    plants: ["Topiarias estruturantes", "Maciços de forração", "Espécies de destaque"],
  },
  {
    slug: "residencial-curadoria-botanica",
    title: "Residencial com curadoria botânica",
    category: "Residencial",
    location: "Residência de alto padrão",
    area: "Entrada, lateral e área de permanência",
    scope: "Projeto completo com direcionamento de implantação",
    cover: localAsset("PAISAGISMO-PRISCILLA-ROSANE_p2_i1.jpg"),
    gallery: [
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p2_i1.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p4_i2.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p9_i1.jpg"),
    ],
    summary:
      "Paleta vegetal desenhada para valorizar fachada, conforto térmico e manutenção previsível.",
    challenge:
      "Equilibrar densidade verde e limpeza formal da arquitetura, preservando circulação e manutenção simples.",
    solution:
      "Foram definidas camadas vegetais por altura e textura, com espécies adaptadas ao uso cotidiano do espaço.",
    plants: ["Arbustos de estrutura", "Herbáceas tropicais", "Forrações de baixa manutenção"],
  },
  {
    slug: "implantacao-acesso-e-estar",
    title: "Implantação orientada de acesso e estar",
    category: "Implantação orientada",
    location: "Projeto residencial em fase de obra",
    area: "Acessos, transições e áreas externas",
    scope: "Projeto e acompanhamento técnico de implantação",
    cover: localAsset("PAISAGISMO-PRISCILLA-ROSANE_p5_i2.jpg"),
    gallery: [
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p5_i2.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p8_i1.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p3_i1.jpg"),
    ],
    summary:
      "Diretrizes técnicas para execução consistente entre desenho, fornecedores e resultado final.",
    challenge:
      "Traduzir estudo em uma sequência clara de implantação sem comprometer o conceito original.",
    solution:
      "O escopo organiza espécies, materiais e ritmo de execução com checkpoints técnicos ao longo da obra.",
    plants: ["Espécies de borda", "Maciços de preenchimento", "Pontos vegetais de destaque"],
  },
  {
    slug: "fachadas-e-percurso-de-chegada",
    title: "Fachadas e percurso de chegada",
    category: "Fachadas e acessos",
    location: "Projeto residencial selecionado",
    area: "Frente do lote e transições de entrada",
    scope: "Estudo 3D, executivo e orientação de composição",
    cover: localAsset("PAISAGISMO-PRISCILLA-ROSANE_p3_i2.jpg"),
    gallery: [
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p3_i2.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p6_i1.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p5_i1.jpg"),
    ],
    summary:
      "Composição de fachada para reforçar hierarquia de entrada e valor percebido do imóvel.",
    challenge:
      "Conduzir o olhar para os pontos certos da fachada sem sobrecarregar o conjunto.",
    solution:
      "A leitura espacial combina volumes vegetais e negativos estratégicos para destacar arquitetura e percurso.",
    plants: ["Espécies de enquadramento", "Arbustos de ritmo", "Forrações de acabamento"],
  },
  {
    slug: "estudo-executivo-de-areas-externas",
    title: "Estudo executivo de áreas externas",
    category: "Estudo 3D",
    location: "Residencial com programa externo completo",
    area: "Entrada, lateral e apoio gourmet",
    scope: "Conceito, 3D e orientações executivas",
    cover: localAsset("PAISAGISMO-PRISCILLA-ROSANE_p9_i1.jpg"),
    gallery: [
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p9_i1.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p4_i1.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p2_i2.jpg"),
    ],
    summary:
      "Projeto orientado para permanência, privacidade e integração entre arquitetura e vegetação.",
    challenge:
      "Manter unidade visual entre diferentes frentes externas com necessidades técnicas distintas.",
    solution:
      "O estudo conecta espécies, materiais e percursos em uma linguagem única para toda a área externa.",
    plants: ["Palmáceas pontuais", "Maciços tropicais", "Forrações de transição"],
  },
];

export const featuredProjects = premiumProjects.slice(0, 4);

export function getProjectBySlug(slug) {
  return premiumProjects.find((project) => project.slug === slug);
}

export function buildWhatsAppUrl(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
