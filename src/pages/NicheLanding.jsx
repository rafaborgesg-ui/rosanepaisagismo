import { Link } from "react-router-dom";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const pages = {
  "jardim-tropical": {
    title: "Jardim Tropical Moderno",
    eyebrow: "Tropical sofisticado",
    description: "Projetos de jardins tropicais contemporâneos para casas, áreas gourmet, fachadas e espaços de convivência.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1920",
    keywords: "jardim tropical moderno, paisagismo tropical, jardim resort, plantas tropicais para jardim",
    bullets: ["Sensação de resort", "Volumes orgânicos", "Espécies exuberantes", "Manutenção planejada"],
  },
  "jardim-vertical": {
    title: "Jardim Vertical Natural",
    eyebrow: "Verde em espaços compactos",
    description: "Jardins verticais naturais ou preservados para varandas, fachadas, clínicas, áreas gourmet e ambientes corporativos.",
    image: "https://images.unsplash.com/photo-1598516091216-c3059871bbbb?auto=format&fit=crop&q=80&w=1920",
    keywords: "jardim vertical natural, jardim vertical preservado, parede verde, jardim vertical para varanda",
    bullets: ["Parede viva", "Irrigação orientada", "Textura botânica", "Alto impacto visual"],
  },
  "condominios-luxo": {
    title: "Paisagismo para Condomínios de Luxo",
    eyebrow: "Áreas comuns premium",
    description: "Paisagismo para entradas, praças, piscinas, áreas comuns e percursos de condomínios residenciais de alto padrão.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1920",
    keywords: "paisagismo para condomínio, paisagismo condomínio de luxo, jardim para condomínio, áreas comuns premium",
    bullets: ["Entradas marcantes", "Áreas comuns valorizadas", "Implantação por etapas", "Manutenção recorrente"],
  },
  "fachadas-comerciais": {
    title: "Paisagismo para Fachadas Comerciais",
    eyebrow: "Primeira impressão que vende",
    description: "Projetos para fachadas comerciais, lojas, clínicas e escritórios que precisam elevar percepção de marca.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1920",
    keywords: "paisagismo fachada comercial, jardim para loja, fachada de clínica, paisagismo comercial",
    bullets: ["Marca mais memorável", "Entrada acolhedora", "Espécies resistentes", "Baixa manutenção"],
  },
  "paisagismo-corporativo": {
    title: "Paisagismo Corporativo",
    eyebrow: "Biofilia para empresas",
    description: "Paisagismo para empresas, escritórios, recepções e áreas comuns com foco em bem-estar e percepção de valor.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920",
    keywords: "paisagismo corporativo, biofilia empresas, jardim corporativo, paisagismo escritório",
    bullets: ["Ambientes mais humanos", "Bem-estar", "Marca premium", "Planos de manutenção"],
  },
};

export default function NicheLanding({ slug }) {
  const page = pages[slug] || pages["jardim-tropical"];

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO title={page.title} description={page.description} keywords={page.keywords} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav />

      <main className="font-body">
        <section className="relative min-h-[88vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <img src={page.image} alt={page.title} className="absolute inset-0 h-full w-full object-cover opacity-42" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/86 to-[#173727]/22" />
          <div className="relative mx-auto grid min-h-[74vh] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1fr_0.82fr] md:px-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">{page.eyebrow}</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">{page.title}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76">{page.description}</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to={`/contato?interesse=${encodeURIComponent(page.title)}`} className="rounded-full bg-[#d7ae45] px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-white">
                  Solicitar diagnóstico
                </Link>
                <Link to="/quiz-paisagismo" className="rounded-full border border-white/30 px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-white hover:border-[#d7ae45] hover:text-[#d7ae45]">
                  Fazer quiz
                </Link>
              </div>
            </div>
            <aside className="rounded-[28px] border border-white/15 bg-white/10 p-7 backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Diferenciais</p>
              <div className="mt-6 space-y-4">
                {page.bullets.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                    <span className="material-symbols-outlined text-[#d7ae45]">check_circle</span>
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ["Diagnóstico", "Entendimento do espaço, estilo, uso, insolação, cidade, manutenção e investimento."],
              ["Direção visual", "Referências, espécies, volumes, pontos de impacto e relação com a arquitetura."],
              ["Próximos passos", "Caminho para projeto, implantação, fornecedores e manutenção recorrente."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-[24px] border border-stone-200 bg-white p-7 shadow-sm">
                <h2 className="font-display text-3xl font-bold">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-stone-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#173727] px-5 py-20 text-center text-white md:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Próximo passo</p>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl">Transforme inspiração em briefing.</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">Envie fotos, cidade e objetivo do espaço para receber uma orientação mais precisa.</p>
            <Link to={`/contato?interesse=${encodeURIComponent(page.title)}`} className="mt-9 inline-block rounded-full bg-[#d7ae45] px-9 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-white">
              Preencher briefing
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
