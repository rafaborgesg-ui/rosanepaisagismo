import { Link } from "react-router-dom";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const WHATSAPP = "5538999313930";

const services = [
  {
    title: "Residências de alto padrão",
    text: "Projetos completos para jardins, entradas, áreas gourmet, piscinas e espaços de convivência.",
    href: "/paisagismo-residencial",
    icon: "villa",
  },
  {
    title: "Clínicas e consultórios",
    text: "Paisagismo biofílico para elevar acolhimento, percepção de qualidade e experiência do paciente.",
    href: "/paisagismo-clinicas",
    icon: "local_florist",
  },
  {
    title: "Áreas gourmet & piscinas",
    text: "Ambientes externos de convivência com jardim, piscina, iluminação e manutenção pensadas para uso real.",
    href: "/area-gourmet-piscina",
    icon: "pool",
  },
  {
    title: "Manutenção premium",
    text: "Planos recorrentes para preservar o jardim, proteger o investimento e manter o visual sempre impecável.",
    href: "/manutencao-premium",
    icon: "verified",
  },
];

const qualification = [
  "Cidade e bairro do imóvel",
  "Tipo de espaço e área aproximada",
  "Faixa de investimento desejada",
  "Prazo para começar o projeto",
];

const cases = [
  {
    title: "Casa com área gourmet",
    result: "Jardim tropical, piscina integrada e iluminação cênica para uso social.",
    metric: "Ticket ideal: R$ 35k a R$ 120k",
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "Entrada residencial premium",
    result: "Composição botânica para valorizar fachada, percurso e primeira impressão.",
    metric: "Entrega em etapas: projeto, obra e manutenção",
    image: "https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "Clínica com biofilia",
    result: "Ambiente mais acolhedor, sofisticado e memorável para pacientes.",
    metric: "Diferencial competitivo para marcas de saúde",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=900",
  },
];

const testimonials = [
  {
    name: "Cliente residencial",
    context: "Casa com piscina e área gourmet",
    text: "O projeto trouxe unidade para a área externa. Antes tínhamos espaços soltos; agora a casa ganhou um ambiente de convivência que usamos toda semana.",
  },
  {
    name: "Clínica premium",
    context: "Recepção e fachada",
    text: "O jardim mudou a primeira impressão dos pacientes. A clínica ficou mais acolhedora e alinhada ao posicionamento que queríamos transmitir.",
  },
  {
    name: "Residência em reforma",
    context: "Fachada e jardim social",
    text: "A orientação técnica ajudou a evitar compras erradas e deixou a execução mais organizada. O resultado ficou elegante sem parecer exagerado.",
  },
];

const faq = [
  {
    question: "Vocês fazem apenas o projeto ou também acompanham a execução?",
    answer: "O atendimento pode incluir diagnóstico, projeto, orientação de implantação e manutenção. O melhor formato é definido depois do briefing, conforme estágio da obra, cidade e investimento.",
  },
  {
    question: "Qual investimento mínimo faz sentido para um projeto premium?",
    answer: "Para projetos residenciais completos, normalmente trabalhamos melhor a partir de R$ 25 mil de implantação. Revitalizações pontuais podem começar abaixo disso, dependendo do escopo.",
  },
  {
    question: "Atendem fora de Montes Claros?",
    answer: "Sim. O atendimento pode acontecer em Minas Gerais, São Paulo e outras regiões conforme escopo, agenda e viabilidade técnica.",
  },
  {
    question: "Consigo enviar fotos antes de agendar uma reunião?",
    answer: "Sim. A página de contato permite enviar informações e anexos. Fotos, planta baixa e medidas aproximadas aceleram muito o diagnóstico.",
  },
];

const whatsappMessage = encodeURIComponent(
  "Olá, Rosane. Vim pelo site e quero avaliar um projeto de paisagismo premium. Pode me ajudar?"
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Projetos de Paisagismo Premium em MG e SP"
        description="Paisagismo residencial e comercial de alto padrão. Projetos para casas, áreas gourmet, piscinas, clínicas e manutenção premium em Minas Gerais e São Paulo."
        keywords="paisagismo premium, paisagista em Montes Claros, paisagismo residencial, jardim para área gourmet, paisagismo para clínicas, projeto de jardim"
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Rosane Paisagismo",
          description: "Projetos de paisagismo premium para residências, clínicas e áreas externas.",
          telephone: "+55 38 99931-3930",
          areaServed: ["Montes Claros", "Minas Gerais", "São Paulo"],
          url: "https://rosanepaisagismo-site.vercel.app/",
          sameAs: ["https://www.instagram.com/rosanepaisagismo/"],
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#173727]/90 backdrop-blur-xl font-body">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link to="/" className="flex items-center gap-3 text-white">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#d7ae45] font-display text-2xl font-bold text-[#173727]">R</span>
            <span className="leading-tight">
              <span className="block text-sm font-bold uppercase tracking-[0.24em]">Rosane</span>
              <span className="block text-xs uppercase tracking-[0.18em] text-white/60">Paisagismo</span>
            </span>
          </Link>
          <div className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.18em] text-white/70 md:flex">
            <a href="#servicos" className="hover:text-[#d7ae45]">Serviços</a>
            <a href="#portfolio" className="hover:text-[#d7ae45]">Portfólio</a>
            <a href="#metodo" className="hover:text-[#d7ae45]">Método</a>
            <Link to="/contato" className="rounded-full bg-[#d7ae45] px-6 py-3 text-[#173727] hover:bg-white">Agendar diagnóstico</Link>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#d7ae45] px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-[#173727] md:hidden"
          >
            WhatsApp
          </a>
        </div>
      </nav>

      <main className="font-body">
        <section className="relative min-h-[92vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1920"
            alt="Jardim residencial premium com paisagismo tropical"
            className="absolute inset-0 h-full w-full object-cover opacity-38"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/82 to-[#173727]/35" />
          <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-8">
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.34em] text-[#d7ae45]">
                Paisagismo premium em Minas Gerais e São Paulo
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.03] md:text-7xl">
                Jardins que valorizam imóveis e transformam a experiência de viver.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/78">
                Projetos autorais para residências, áreas gourmet, piscinas, clínicas e espaços corporativos. Estratégia estética, escolha botânica e execução pensadas para alto padrão.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/contato?utm_source=site&utm_medium=hero&utm_campaign=diagnostico"
                  className="rounded-full bg-[#d7ae45] px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-2xl shadow-black/20 hover:bg-white"
                >
                  Agendar diagnóstico
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/35 px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-white hover:border-[#d7ae45] hover:text-[#d7ae45]"
                >
                  Falar no WhatsApp
                </a>
                <Link
                  to="/quiz-paisagismo"
                  className="rounded-full border border-[#d7ae45]/70 px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#d7ae45] hover:bg-[#d7ae45] hover:text-[#173727]"
                >
                  Fazer quiz
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Meta de projeto ideal</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  ["25+", "anos de experiência"],
                  ["200+", "projetos orientados"],
                  ["R$25k+", "ticket recomendado"],
                  ["4 etapas", "diagnóstico ao pós-obra"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-white/12 p-5">
                    <p className="font-display text-4xl font-bold text-white">{value}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/58">{label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-white/70">
                O objetivo do site agora é simples: atrair clientes com orçamento, qualificar rápido e levar para uma conversa comercial com contexto.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
            {["Projeto autoral", "Curadoria botânica", "Execução orientada", "Manutenção premium"].map((item) => (
              <div key={item} className="border-l-2 border-[#d7ae45] py-2 pl-5">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#173727]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#fbfaf6] px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Landing pages para SEO e tráfego</p>
            <div className="grid gap-3 md:grid-cols-5">
              {[
                ["Jardim tropical", "/jardim-tropical"],
                ["Jardim vertical", "/jardim-vertical"],
                ["Condomínios", "/condominios-luxo"],
                ["Fachadas comerciais", "/fachadas-comerciais"],
                ["Corporativo", "/paisagismo-corporativo"],
                ["Montes Claros", "/paisagista-em-montes-claros"],
                ["São Paulo", "/paisagismo-em-sao-paulo"],
                ["Alto padrão MG", "/paisagismo-alto-padrao-mg"],
                ["Manutenção", "/manutencao-premium"],
                ["Sobre", "/sobre"],
              ].map(([label, href]) => (
                <Link key={href} to={href} className="rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm font-extrabold uppercase tracking-wider text-[#173727] transition hover:border-[#d7ae45] hover:shadow-md">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="servicos" className="px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Serviços de maior faturamento</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
                Venda menos orçamento solto. Venda transformação completa.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <Link key={service.title} to={service.href} className="group rounded-[22px] border border-stone-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <span className="material-symbols-outlined grid h-12 w-12 place-items-center rounded-full bg-[#173727] text-[#d7ae45]">{service.icon}</span>
                  <h3 className="mt-8 font-display text-2xl font-bold text-[#173727]">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-stone-600">{service.text}</p>
                  <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.18em] text-[#b28a28] group-hover:text-[#173727]">Solicitar avaliação</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="bg-[#eef3ed] px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Prova visual e comercial</p>
                <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">O cliente precisa enxergar o resultado antes da reunião.</h2>
              </div>
              <Link to="/portfolio" className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#173727] underline decoration-[#d7ae45] decoration-2 underline-offset-8">
                Ver portfólio completo
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {cases.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-[24px] bg-white shadow-sm">
                  <img src={item.image} alt={item.title} className="h-72 w-full object-cover" />
                  <div className="p-7">
                    <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-600">{item.result}</p>
                    <p className="mt-5 rounded-full bg-[#fbfaf6] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#173727]">{item.metric}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="metodo" className="grid bg-white md:grid-cols-2">
          <div className="px-5 py-24 md:px-12 lg:px-20">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Método comercial</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">Diagnóstico primeiro. Proposta depois.</h2>
            <p className="mt-6 max-w-xl leading-8 text-stone-600">
              Para chegar a R$100k por mês, o site precisa separar curiosidade de intenção real. Por isso, a chamada principal leva a um diagnóstico com dados suficientes para precificar, priorizar e fechar melhor.
            </p>
            <div className="mt-10 space-y-4">
              {qualification.map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl border border-stone-200 p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#173727] text-sm font-bold text-[#d7ae45]">{index + 1}</span>
                  <span className="font-semibold text-[#173727]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[520px] bg-[#173727]">
            <img
              src="https://media.base44.com/images/public/69ea9c43ca6eb4180010c463/9825cfba9_IMG_7921jpg.jpg"
              alt="Rosane Borges, especialista em paisagismo"
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-x-6 bottom-6 rounded-[24px] bg-white p-7 shadow-2xl md:inset-x-10 md:bottom-10">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#b28a28]">Autoridade</p>
              <h3 className="mt-2 font-display text-3xl font-bold text-[#173727]">Rosane Borges</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                Especialista em paisagismo com base técnica em produção vegetal, plantas ornamentais e projetos de alto padrão.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fbfaf6] px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Confiança para decidir</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
                O cliente premium precisa sentir método, cuidado e previsibilidade.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <article key={item.context} className="rounded-[24px] border border-stone-200 bg-white p-7 shadow-sm">
                  <div className="mb-6 flex gap-1 text-[#d7ae45]" aria-label="Avaliação 5 estrelas">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>★</span>
                    ))}
                  </div>
                  <p className="font-display text-xl font-bold leading-8 text-[#173727]">"{item.text}"</p>
                  <div className="mt-7 border-t border-stone-200 pt-5">
                    <p className="text-sm font-extrabold uppercase tracking-wider text-[#173727]">{item.name}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-stone-400">{item.context}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-24 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Perguntas frequentes</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                Tire as dúvidas antes do diagnóstico.
              </h2>
              <p className="mt-5 leading-8 text-stone-600">
                Quanto mais claro o escopo, melhor a proposta. A ideia é chegar na primeira conversa com contexto suficiente para orientar investimento, prazo e próximos passos.
              </p>
            </div>
            <div className="space-y-4">
              {faq.map((item) => (
                <details key={item.question} className="group rounded-2xl border border-stone-200 bg-[#fbfaf6] p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold text-[#173727]">
                    {item.question}
                    <span className="material-symbols-outlined text-[#b28a28] transition group-open:rotate-180">expand_more</span>
                  </summary>
                  <p className="mt-4 leading-7 text-stone-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#173727] px-5 py-24 text-center text-white md:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-[#d7ae45]">Próximo passo</p>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
              Vamos descobrir o potencial do seu jardim?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl leading-8 text-white/70">
              Envie cidade, tipo de imóvel e fotos do espaço. A equipe retorna com o melhor caminho para projeto, execução ou manutenção.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/contato?utm_source=site&utm_medium=cta_final&utm_campaign=diagnostico" className="rounded-full bg-[#d7ae45] px-9 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-white">
                Preencher diagnóstico
              </Link>
              <a href={`https://wa.me/${WHATSAPP}?text=${whatsappMessage}`} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 px-9 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-white hover:border-[#d7ae45] hover:text-[#d7ae45]">
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
