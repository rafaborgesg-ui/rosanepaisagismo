import { supabase } from "@/lib/supabaseClient";

const TABLE = "landing_content";

export const defaultHomeTexts = {
  selected_label: "Projetos selecionados",
  selected_title: "Obras, estudos e implantações com assinatura botânica.",
  selected_cta: "Ver acervo completo",
  services_label: "Nossos Serviços",
  services_title: "Frentes de atuação para projetos que exigem nível alto de execução.",
  method_label: "Método",
  method_title: "Um fluxo claro entre conceito, técnica e implantação.",
  method_text:
    "O objetivo é reduzir ruído nas decisões e proteger o resultado final do jardim, da primeira reunião até a fase de maturação.",
  deliverables_label: "Entregáveis",
  deliverables_title: "O valor do projeto está no que ele entrega para a obra.",
  deliverables_text:
    "Cada etapa transforma decisão estética em diretriz técnica. O cliente entende escopo, prazos e caminho de implantação com segurança.",
  deliverables_items: [
    "Estudo 3D com ajustes de refinamento.",
    "Projeto executivo em Layout/SketchUp ou AutoCAD.",
    "Manual técnico de implantação e manutenção.",
    "Especificação de espécies, vasos, jardineiras e materiais.",
    "Curadoria de fornecedores e composição de acabamentos.",
    "Indicação de iluminação de jardim e infraestrutura para irrigação.",
    "Orçamento aproximado de implantação por etapa.",
    "Visitas técnicas conforme escopo contratado.",
  ],
  testimonial_1_quote:
    "O escritório da Rosane transformou completamente a percepção do nosso imóvel. A residência valorizou mais de 30% após a execução do projeto.",
  testimonial_1_name: "Ana Paula Ferreira",
  testimonial_1_role: "Proprietária — Alphaville, SP",
  testimonial_2_quote:
    "A consultoria foi cirúrgica. O jardim biofílico da nossa clínica criou uma experiência de conforto e luxo única para os nossos pacientes.",
  testimonial_2_name: "Dr. Ricardo Mota",
  testimonial_2_role: "Clínica premium — BH, MG",
  testimonial_3_quote:
    "Uma parceria de altíssimo nível. A entrega impecável e o design sofisticado superaram todas as expectativas dos nossos compradores.",
  testimonial_3_name: "Construtora Ávila",
  testimonial_3_role: "Condomínio de luxo — SP",
  concierge_label: "Atendimento",
  concierge_title: "Vamos avaliar o potencial do seu projeto?",
  concierge_text:
    "Conte sobre o imóvel, fase da obra e escopo desejado. A equipe retorna com o próximo passo mais adequado para seu contexto.",
  concierge_image_url: "/brand/PAISAGISMO-PRISCILLA-ROSANE_p5_i2.jpg",
  concierge_button: "Enviar briefing inicial",
};

export const defaultHeroSlides = [
  {
    titulo: "Fachada residencial com paisagismo autoral",
    imagem_url: "/brand/PAISAGISMO-PRISCILLA-ROSANE_p6_i2.jpg",
  },
  {
    titulo: "Jardim residencial contemporâneo",
    imagem_url: "/brand/PAISAGISMO-PRISCILLA-ROSANE_p9_i1.jpg",
  },
  {
    titulo: "Jardim vertical e área externa",
    imagem_url: "/brand/PAISAGISMO-PRISCILLA-ROSANE_p5_i1.jpg",
  },
  {
    titulo: "Projeto residencial de alto padrão",
    imagem_url: "/brand/PAISAGISMO-PRISCILLA-ROSANE_p3_i2.jpg",
  },
];

export const defaultLandingContent = {
  logo_topo_url: "/brand/rosane-logo-white.png",
  logo_topo_size: 100,
  logo_rodape_url: "/brand/rosane-logo-white.png",
  logo_rodape_size: 100,
  slides: defaultHeroSlides,
  sobre_titulo: "Base acadêmica, critério de obra e leitura sensível da natureza.",
  sobre_cargo: "Rosane Borges",
  sobre_frase: "Rosane une formação em agronomia, doutorado em Produção Vegetal e experiência de campo para desenhar jardins que amadurecem com elegância.",
  sobre_texto: "Cada escolha considera solo, insolação, espécie, escala e manutenção prevista.",
  sobre_imagem_url: "/brand/rosane-borges.jpg",
  servico1_titulo: "Projeto de paisagismo completo",
  servico1_desc: "Para residências e empreendimentos que precisam de conceito, 3D, executivo e definições técnicas.",
  servico2_titulo: "Consultoria técnica seletiva",
  servico2_desc: "Para ajustes específicos de espécies, implantação, materialidade, iluminação e manutenção.",
  servico3_titulo: "Implantação com projeto incluso",
  servico3_desc: "Para clientes que priorizam execução orientada, padrão visual e menor risco na obra.",
  whatsapp_numero: "5538999313930",
  email_contato: "rosanepaisagismo@gmail.com",
  home_texts: defaultHomeTexts,
};

export async function getLandingContentRecord() {
  if (!supabase) return null;

  const { data, error } = await supabase.from(TABLE).select("*").order("created_at", { ascending: true }).limit(1);
  if (error) throw error;
  return data?.[0] || null;
}

export async function saveLandingContentRecord(payload) {
  if (!supabase) throw new Error("Supabase não configurado.");

  const current = await getLandingContentRecord();
  if (current?.id) {
    const { data, error } = await supabase.from(TABLE).update(payload).eq("id", current.id).select("*").single();
    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase.from(TABLE).insert(payload).select("*").single();
  if (error) throw error;
  return data;
}
