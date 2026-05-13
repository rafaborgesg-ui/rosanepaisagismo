import { Link } from "react-router-dom";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const benefits = [
  ["Valorização percebida", "Fachada, entrada, piscina e área gourmet passam a comunicar cuidado, sofisticação e alto padrão."],
  ["Uso real do espaço", "O jardim deixa de ser decoração e passa a organizar convivência, descanso, circulação e contemplação."],
  ["Escolha botânica técnica", "Espécies selecionadas para clima, insolação, manutenção, escala arquitetônica e resultado visual."],
];

const process = [
  "Diagnóstico do imóvel, estilo de vida e investimento",
  "Conceito paisagístico e curadoria de espécies",
  "Projeto visual com setores, volumes e recomendações",
  "Orçamento de implantação e acompanhamento técnico",
];

export default function PaisagismoResidencial() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Paisagismo Residencial Premium"
        description="Projetos de paisagismo residencial de alto padrão para casas, fachadas, piscinas, áreas gourmet e jardins em Minas Gerais e São Paulo."
        keywords="paisagismo residencial premium, jardim para casa alto padrão, paisagismo área gourmet, paisagismo piscina, projeto de jardim residencial"
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav activeLink="residencial" />

      <main className="font-body">
        <section className="relative min-h-[88vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <img
            src="https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1920"
            alt="Paisagismo residencial com jardim e área externa"
            className="absolute inset-0 h-full w-full object-cover opacity-42"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/86 to-[#173727]/25" />
          <div className="relative mx-auto grid min-h-[74vh] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1fr_0.8fr] md:px-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Residências de alto padrão</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">
                Sua casa com jardim de assinatura.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76">
                Projetos para fachadas, piscinas, áreas gourmet, varandas e jardins completos. O foco é transformar espaço externo em patrimônio estético e experiência cotidiana.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/contato?interesse=Paisagismo+Residencial+Premium" className="rounded-full bg-[#d7ae45] px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-white">
                  Solicitar diagnóstico
                </Link>
                <Link to="/portfolio" className="rounded-full border border-white/30 px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-white hover:border-[#d7ae45] hover:text-[#d7ae45]">
                  Ver portfólio
                </Link>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/15 bg-white/10 p-7 backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Indicado para</p>
              <div className="mt-6 space-y-4">
                {["Casas em construção ou reforma", "Áreas gourmet e piscinas", "Fachadas e entradas sociais", "Jardins que precisam de manutenção premium"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                    <span className="material-symbols-outlined text-[#d7ae45]">check_circle</span>
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Por que investir</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
              O jardim certo muda como a casa é vista, usada e lembrada.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map(([title, text]) => (
              <article key={title} className="rounded-[24px] border border-stone-200 bg-white p-7 shadow-sm">
                <h3 className="font-display text-2xl font-bold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#eef3ed] px-5 py-24 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
            <div className="overflow-hidden rounded-[28px]">
              <img src="https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=80&w=1200" alt="Jardim residencial premium" className="h-full min-h-[520px] w-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Processo</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">Da intenção ao jardim executável.</h2>
              <div className="mt-8 space-y-4">
                {process.map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-2xl bg-white p-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#173727] text-sm font-bold text-[#d7ae45]">{index + 1}</span>
                    <p className="font-semibold leading-7">{item}</p>
                  </div>
                ))}
              </div>
              <Link to="/contato?interesse=Paisagismo+Residencial+Premium" className="mt-8 inline-block rounded-full bg-[#d7ae45] px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-[#173727] hover:text-white">
                Começar meu projeto
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
