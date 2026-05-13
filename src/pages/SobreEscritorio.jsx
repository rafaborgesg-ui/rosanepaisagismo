import { Link } from "react-router-dom";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const pillars = [
  ["Arquitetura de exteriores", "O jardim é pensado como parte da arquitetura, não como decoração final."],
  ["Curadoria botânica", "Escolha de espécies com intenção estética, técnica, climática e de manutenção."],
  ["Experiência premium", "Atendimento orientado por briefing, clareza de escopo e resultado visual."],
  ["Preservação do investimento", "Implantação e manutenção conectadas para o jardim continuar bonito."],
];

export default function SobreEscritorio() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Sobre o Escritório"
        description="Conheça a Rosane Paisagismo, escritório boutique de paisagismo premium para residências, clínicas, áreas gourmet, fachadas e manutenção."
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <SiteNav />

      <main className="font-body">
        <section className="grid min-h-[88vh] bg-[#173727] pt-28 text-white md:grid-cols-2">
          <div className="flex items-center px-5 py-16 md:px-12 lg:px-20">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Escritório boutique</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">
                Paisagismo como assinatura de valor, estética e experiência.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76">
                A Rosane Paisagismo une conhecimento técnico, sensibilidade visual e atendimento consultivo para transformar áreas externas em ambientes desejáveis, funcionais e memoráveis.
              </p>
              <Link to="/contato?interesse=Conhecer+o+Escritorio" className="mt-10 inline-block rounded-full bg-[#d7ae45] px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-white">
                Falar com o escritório
              </Link>
            </div>
          </div>
          <div className="relative min-h-[520px]">
            <img src="https://media.base44.com/images/public/69ea9c43ca6eb4180010c463/9825cfba9_IMG_7921jpg.jpg" alt="Rosane Borges" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Posicionamento</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
              Uma marca para quem busca mais do que plantas.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {pillars.map(([title, text]) => (
              <article key={title} className="rounded-[24px] border border-stone-200 bg-white p-7 shadow-sm">
                <h3 className="font-display text-2xl font-bold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-600">{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
