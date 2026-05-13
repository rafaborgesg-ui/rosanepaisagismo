import { Link } from "react-router-dom";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const locals = {
  "paisagista-em-montes-claros": {
    title: "Paisagista em Montes Claros",
    city: "Montes Claros",
    description: "Projetos de paisagismo premium em Montes Claros para residências, áreas gourmet, piscinas, fachadas, clínicas e manutenção.",
    keywords: "paisagista em Montes Claros, paisagismo Montes Claros, jardim em Montes Claros, paisagismo residencial Montes Claros",
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1920",
    regions: ["Ibituruna", "Morada do Sol", "Jardim São Luiz", "Condomínios residenciais", "Clínicas e fachadas comerciais"],
  },
  "paisagismo-em-sao-paulo": {
    title: "Paisagismo em São Paulo",
    city: "São Paulo",
    description: "Projetos de paisagismo de alto padrão em São Paulo para casas, clínicas, fachadas comerciais, áreas gourmet e jardins verticais.",
    keywords: "paisagista em São Paulo, paisagismo São Paulo, paisagismo alto padrão SP, jardim residencial São Paulo",
    image: "https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=80&w=1920",
    regions: ["Residências de alto padrão", "Clínicas premium", "Fachadas comerciais", "Coberturas", "Áreas gourmet"],
  },
  "paisagismo-alto-padrao-mg": {
    title: "Paisagismo Alto Padrão em MG",
    city: "Minas Gerais",
    description: "Paisagismo alto padrão em Minas Gerais com projeto autoral, curadoria botânica, implantação orientada e manutenção premium.",
    keywords: "paisagismo alto padrão MG, paisagista Minas Gerais, projeto de jardim MG, paisagismo premium Minas Gerais",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1920",
    regions: ["Montes Claros", "Condomínios", "Casas de campo", "Clínicas", "Empresas"],
  },
};

export default function LocalLanding({ slug }) {
  const page = locals[slug] || locals["paisagista-em-montes-claros"];

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title={page.title}
        description={page.description}
        keywords={page.keywords}
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Rosane Paisagismo",
          areaServed: page.city,
          telephone: "+55 38 99931-3930",
          description: page.description,
        }}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav />

      <main className="font-body">
        <section className="relative min-h-[88vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <img src={page.image} alt={page.title} className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/86 to-[#173727]/20" />
          <div className="relative mx-auto grid min-h-[74vh] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1fr_0.8fr] md:px-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">SEO local e atendimento premium</p>
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
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Atendimentos comuns</p>
              <div className="mt-6 space-y-4">
                {page.regions.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                    <span className="material-symbols-outlined text-[#d7ae45]">location_on</span>
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
              ["Residencial premium", "Fachadas, áreas gourmet, piscinas, jardins tropicais e manutenção recorrente."],
              ["Clínicas e comércio", "Ambientes de marca, acolhimento, fachadas comerciais e biofilia."],
              ["Execução planejada", "Diagnóstico, projeto, implantação por etapas e orientação de fornecedores."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-[24px] border border-stone-200 bg-white p-7 shadow-sm">
                <h2 className="font-display text-3xl font-bold">{title}</h2>
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
