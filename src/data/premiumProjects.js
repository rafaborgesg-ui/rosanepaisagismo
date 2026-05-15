export const WHATSAPP_NUMBER = "5538999313930";

export const WHATSAPP_MESSAGE =
  "Ola, quero iniciar uma avaliacao de projeto com a Rosane Paisagismo.";

export const portfolioCategories = [
  "Todos",
  "Estudo 3D",
  "Residencial",
  "Implantacao orientada",
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
    scope: "Conceito botanico, estudo 3D e diretrizes executivas",
    cover: localAsset("PAISAGISMO-PRISCILLA-ROSANE_p6_i2.jpg"),
    gallery: [
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p2_i2.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p6_i2.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p8_i1.jpg"),
    ],
    summary:
      "Composicao de entrada com leitura arquitetonica, privacidade e percurso de chegada.",
    challenge:
      "Criar impacto de chegada sem excesso visual, mantendo proporcao entre arquitetura, vegetacao e acessos.",
    solution:
      "A proposta organiza massas vegetais, textura de piso e pontos focais para reforcar escala, permanencia e leitura do imovel.",
    plants: ["Topiarias estruturantes", "Macicos de forracao", "Especies de destaque"],
  },
  {
    slug: "residencial-curadoria-botanica",
    title: "Residencial com curadoria botanica",
    category: "Residencial",
    location: "Residencia de alto padrao",
    area: "Entrada, lateral e area de permanencia",
    scope: "Projeto completo com direcionamento de implantacao",
    cover: localAsset("PAISAGISMO-PRISCILLA-ROSANE_p2_i1.jpg"),
    gallery: [
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p2_i1.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p4_i2.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p9_i1.jpg"),
    ],
    summary:
      "Paleta vegetal desenhada para valorizar fachada, conforto termico e manutencao previsivel.",
    challenge:
      "Equilibrar densidade verde e limpeza formal da arquitetura, preservando circulacao e manutencao simples.",
    solution:
      "Foram definidas camadas vegetais por altura e textura, com especies adaptadas ao uso cotidiano do espaco.",
    plants: ["Arbustos de estrutura", "Herbaceas tropicais", "Forracoes de baixa manutencao"],
  },
  {
    slug: "implantacao-acesso-e-estar",
    title: "Implantacao orientada de acesso e estar",
    category: "Implantacao orientada",
    location: "Projeto residencial em fase de obra",
    area: "Acessos, transicoes e areas externas",
    scope: "Projeto e acompanhamento tecnico de implantacao",
    cover: localAsset("PAISAGISMO-PRISCILLA-ROSANE_p5_i2.jpg"),
    gallery: [
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p5_i2.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p8_i1.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p3_i1.jpg"),
    ],
    summary:
      "Diretrizes tecnicas para execucao consistente entre desenho, fornecedores e resultado final.",
    challenge:
      "Traduzir estudo em uma sequencia clara de implantacao sem comprometer o conceito original.",
    solution:
      "O escopo organiza especies, materiais e ritmo de execucao com checkpoints tecnicos ao longo da obra.",
    plants: ["Especies de borda", "Macicos de preenchimento", "Pontos vegetais de destaque"],
  },
  {
    slug: "fachadas-e-percurso-de-chegada",
    title: "Fachadas e percurso de chegada",
    category: "Fachadas e acessos",
    location: "Projeto residencial selecionado",
    area: "Frente do lote e transicoes de entrada",
    scope: "Estudo 3D, executivo e orientacao de composicao",
    cover: localAsset("PAISAGISMO-PRISCILLA-ROSANE_p3_i2.jpg"),
    gallery: [
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p3_i2.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p6_i1.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p5_i1.jpg"),
    ],
    summary:
      "Composicao de fachada para reforcar hierarquia de entrada e valor percebido do imovel.",
    challenge:
      "Conduzir o olhar para os pontos certos da fachada sem sobrecarregar o conjunto.",
    solution:
      "A leitura espacial combina volumes vegetais e negativos estrategicos para destacar arquitetura e percurso.",
    plants: ["Especies de enquadramento", "Arbustos de ritmo", "Forracoes de acabamento"],
  },
  {
    slug: "estudo-executivo-de-areas-externas",
    title: "Estudo executivo de areas externas",
    category: "Estudo 3D",
    location: "Residencial com programa externo completo",
    area: "Entrada, lateral e apoio gourmet",
    scope: "Conceito, 3D e orientacoes executivas",
    cover: localAsset("PAISAGISMO-PRISCILLA-ROSANE_p9_i1.jpg"),
    gallery: [
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p9_i1.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p4_i1.jpg"),
      localAsset("PAISAGISMO-PRISCILLA-ROSANE_p2_i2.jpg"),
    ],
    summary:
      "Projeto orientado para permanencia, privacidade e integracao entre arquitetura e vegetacao.",
    challenge:
      "Manter unidade visual entre diferentes frentes externas com necessidades tecnicas distintas.",
    solution:
      "O estudo conecta especies, materiais e percursos em uma linguagem unica para toda a area externa.",
    plants: ["Palmaceas pontuais", "Macicos tropicais", "Forracoes de transicao"],
  },
];

export const featuredProjects = premiumProjects.slice(0, 4);

export function getProjectBySlug(slug) {
  return premiumProjects.find((project) => project.slug === slug);
}

export function buildWhatsAppUrl(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
