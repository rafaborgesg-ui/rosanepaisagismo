import { Link } from "react-router-dom";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const highlights = [
  ["Convivência", "Setores pensados para receber, cozinhar, descansar e circular com conforto."],
  ["Piscina integrada", "Composição vegetal que valoriza bordas, espelhos d'água e áreas de permanência."],
  ["Iluminação cênica", "Jardim bonito também à noite, com atmosfera adequada para eventos e família."],
  ["Manutenção planejada", "Escolha botânica orientada por clima, insolação, limpeza e rotina da casa."],
];

const packages = [
  {
    title: "Revitalização estratégica",
    text: "Para quem já tem área gourmet ou piscina e precisa elevar estética, plantas, iluminação e pontos de uso.",
    range: "Ideal a partir de R$ 18k",
  },
  {
    title: "Projeto completo",
    text: "Para obra, reforma ou casa nova: conceito, setores, vegetação, materiais, fornecedores e implantação.",
    range: "Ideal a partir de R$ 35k",
  },
  {
    title: "Transformação premium",
    text: "Para residências de alto padrão que precisam de jardim, piscina, gourmet, fachada e manutenção integrada.",
    range: "Ideal a partir de R$ 80k",
  },
];

export default function AreaGourmetPiscina() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Paisagismo para Área Gourmet e Piscina"
        description="Projetos de paisagismo premium para áreas gourmet, piscinas, jardins de convivência e espaços externos residenciais."
        keywords="paisagismo área gourmet, paisagismo piscina, jardim para piscina, área externa premium, projeto área gourmet"
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav activeLink="gourmet" />

      <main className="font-body">
        <section className="relative min-h-[90vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <img
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1920"
            alt="Área gourmet com piscina e paisagismo"
            className="absolute inset-0 h-full w-full object-cover opacity-44"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/84 to-[#173727]/20" />
          <div className="relative mx-auto grid min-h-[76vh] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1fr_0.8fr] md:px-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Área gourmet, piscina e jardim</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">
                O espaço mais desejado da casa precisa parecer planejado, não improvisado.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76">
                Transformamos áreas externas em ambientes de convivência premium, com vegetação, iluminação, circulação e manutenção pensadas para uso real.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/contato?interesse=Area+Gourmet+e+Piscina" className="rounded-full bg-[#d7ae45] px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-white">
                  Avaliar minha área externa
                </Link>
                <Link to="/portfolio" className="rounded-full border border-white/30 px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-white hover:border-[#d7ae45] hover:text-[#d7ae45]">
                  Ver referências
                </Link>
              </div>
            </div>
            <aside className="rounded-[28px] border border-white/15 bg-white/10 p-7 backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">O que analisamos</p>
              <div className="mt-6 space-y-4">
                {["Sol e sombra", "Circulação e privacidade", "Relação com piscina", "Estilo da arquitetura", "Custo de implantação", "Rotina de manutenção"].map((item) => (
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
          <div className="mb-14 max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Decisões que mudam o resultado</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
              O projeto une beleza, uso e manutenção.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {highlights.map(([title, text]) => (
              <article key={title} className="rounded-[24px] border border-stone-200 bg-white p-7 shadow-sm">
                <h3 className="font-display text-2xl font-bold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#eef3ed] px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Caminhos de contratação</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                Cada casa pede um nível de intervenção.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {packages.map((item) => (
                <article key={item.title} className="rounded-[28px] bg-white p-8 shadow-sm">
                  <h3 className="font-display text-3xl font-bold">{item.title}</h3>
                  <p className="mt-4 leading-7 text-stone-600">{item.text}</p>
                  <p className="mt-7 rounded-full bg-[#fbfaf6] px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-[#173727]">{item.range}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#173727] px-5 py-20 text-center text-white md:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Diagnóstico</p>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl">
              Envie fotos da sua área gourmet ou piscina.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
              Com algumas imagens e medidas aproximadas já conseguimos indicar se o melhor caminho é revitalização, projeto completo ou transformação por etapas.
            </p>
            <Link to="/contato?interesse=Area+Gourmet+e+Piscina" className="mt-9 inline-block rounded-full bg-[#d7ae45] px-9 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-white">
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
