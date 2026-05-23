import { supabase } from "@/lib/supabaseClient";

const TABLE = "landing_content";

export const defaultHomeTexts = {
  selected_label: "Projetos selecionados",
  selected_title: "Cases editoriais onde a natureza valoriza a arquitetura.",
  selected_cta: "Ver cases selecionados",
  services_label: "Atelier de projetos",
  services_title: "Paisagismo para imóveis que exigem autoria, precisão e execução.",
  method_label: "Método",
  method_title: "Do desejo de atmosfera à obra tecnicamente orientada.",
  method_text:
    "O processo organiza escolhas sensíveis e decisões técnicas para que o jardim nasça coerente, viável e fiel à arquitetura.",
  deliverables_label: "Direção executiva",
  deliverables_title: "O luxo está na precisão que a obra consegue executar.",
  deliverables_text:
    "Cada etapa transforma atmosfera em diretriz de implantação. O cliente entende escopo, sequência, espécies e manutenção antes de executar.",
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
  concierge_label: "Briefing privado",
  concierge_title: "Uma curadoria inicial para um jardim feito sob medida.",
  concierge_text:
    "Conte sobre o imóvel, fase da obra e intenção de uso. A equipe retorna com o caminho mais adequado para iniciar uma proposta autoral e tecnicamente orientada.",
  concierge_image_url: "/brand/PAISAGISMO-PRISCILLA-ROSANE_p5_i2.jpg",
  concierge_button: "Enviar briefing privado",
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
  sobre_titulo: "Autoria botânica com ciência, obra e olhar de arquitetura.",
  sobre_cargo: "Rosane Borges",
  sobre_frase: "Rosane une Doutorado em Produção Vegetal, formação em agronomia e experiência de campo para criar jardins de presença silenciosa, longevidade e precisão arquitetônica.",
  sobre_texto: "A assinatura nasce da escolha das espécies, da proporção dos volumes e da forma como o espaço amadurece com a rotina.",
  sobre_imagem_url: "/brand/rosane-borges.jpg",
  servico1_titulo: "Projeto de paisagismo completo",
  servico1_desc: "Para residências e empreendimentos que precisam de conceito autoral, estudo 3D, executivo e definições técnicas.",
  servico2_titulo: "Curadoria técnica seletiva",
  servico2_desc: "Para decisões específicas de espécies, implantação, materialidade, iluminação e manutenção com olhar especialista.",
  servico3_titulo: "Implantação orientada",
  servico3_desc: "Para clientes que priorizam execução acompanhada, padrão visual elevado e menor risco de improviso na obra.",
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
