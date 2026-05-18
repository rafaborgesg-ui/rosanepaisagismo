import { supabase } from "@/lib/supabaseClient";

const TABLE = "landing_content";

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
  logo_topo_url: "",
  logo_topo_size: 100,
  logo_rodape_url: "",
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
