import { Link, useParams } from "react-router-dom";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const WHATSAPP = "5538999313930";

const services = {
  "paisagismo-residencial": {
    title: "Paisagismo Residencial Premium",
    subtitle: "Jardins, fachadas, piscinas e áreas gourmet com assinatura botânica.",
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1920",
    bullets: ["Fachadas de impacto", "Áreas externas funcionais", "Curadoria botânica", "Implantação orientada"],
    investment: "Projetos indicados a partir de R$ 25 mil",
  },
  "paisagismo-corporativo": {
    title: "Paisagismo Corporativo e Clínicas",
    subtitle: "Biofilia aplicada à percepção de marca, acolhimento e bem-estar.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920",
    bullets: ["Recepções e fachadas", "Ambientes de espera", "Baixa manutenção", "Experiência do cliente"],
    investment: "Projetos indicados a partir de R$ 20 mil",
  },
  "jardins-verticais": {
    title: "Jardins Verticais",
    subtitle: "Soluções verdes para paredes, varandas, coberturas e fachadas compactas.",
    image: "https://images.unsplash.com/photo-1598516091216-c3059871bbbb?auto=format&fit=crop&q=80&w=1920",
    bullets: ["Aproveitamento de espaço", "Sistema de irrigação", "Textura botânica", "Impacto visual imediato"],
    investment: "Projetos indicados a partir de R$ 15 mil",
  },
};

const fallback = {
  title: "Projeto de Paisagismo Premium",
  subtitle: "Uma solução sob medida para transformar o espaço externo em valor percebido.",
  image: "https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=80&w=1920",
  bullets: ["Diagnóstico", "Projeto autoral", "Curadoria de espécies", "Execução planejada"],
  investment: "Avaliação personalizada por briefing",
};

export default function ServicoLanding() {
  const { id } = useParams();
  const data = services[id] || fallback;
  const message = encodeURIComponent(`Olá, Rosane. Vim pela página ${data.title} e quero um diagnóstico.`);

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title={data.title}
        description={`${data.subtitle} ${data.investment}.`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: data.title,
          description: data.subtitle,
          provider: {
            "@type": "LocalBusiness",
            name: "Rosane Paisagismo",
            areaServed: ["Minas Gerais", "São Paulo"],
          },
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
          <img src={data.image} alt={data.title} className="absolute inset-0 h-full w-full object-cover opacity-42" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/86 to-[#173727]/25" />
          <div className="relative mx-auto grid min-h-[74vh] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1fr_0.8fr] md:px-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Serviço especializado</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">{data.title}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76">{data.subtitle}</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to={`/contato?interesse=${encodeURIComponent(data.title)}`} className="rounded-full bg-[#d7ae45] px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-white">
                  Solicitar diagnóstico
                </Link>
                <a href={`https://wa.me/${WHATSAPP}?text=${message}`} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-white hover:border-[#d7ae45] hover:text-[#d7ae45]">
                  WhatsApp
                </a>
              </div>
            </div>
            <aside className="rounded-[28px] border border-white/15 bg-white/10 p-7 backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Escopo comum</p>
              <div className="mt-6 space-y-4">
                {data.bullets.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                    <span className="material-symbols-outlined text-[#d7ae45]">check_circle</span>
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-2xl bg-[#d7ae45] p-4 text-sm font-extrabold uppercase tracking-wider text-[#173727]">{data.investment}</p>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ["1. Diagnóstico", "Entendimento do espaço, objetivo, orçamento, estilo e restrições técnicas."],
              ["2. Direção criativa", "Conceito visual, setores de uso, espécies, materiais e recomendações."],
              ["3. Caminho de execução", "Próximas etapas para projeto detalhado, implantação e manutenção."],
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
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Briefing qualificado</p>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl">Receba uma orientação compatível com o seu investimento.</h2>
            <Link to={`/contato?interesse=${encodeURIComponent(data.title)}`} className="mt-9 inline-block rounded-full bg-[#d7ae45] px-9 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-white">
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
