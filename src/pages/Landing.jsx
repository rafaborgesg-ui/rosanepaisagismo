import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import EmailCapturePopup from "@/components/landing/EmailCapturePopup";
import BeforeAfterSlider from "@/components/landing/BeforeAfterSlider";
import SEO from "@/components/seo/SEO";

const WHATSAPP = "5538999313930";

const services = [
  {
    title: "Residências Exclusivas",
    text: "Projetos arquitetônicos completos para jardins e fachadas que elevam o status e a valorização do imóvel.",
    href: "/paisagismo-residencial",
    icon: "villa",
  },
  {
    title: "Clínicas Premium",
    text: "Paisagismo biofílico projetado para transmitir acolhimento, luxo e altíssima percepção de qualidade aos pacientes.",
    href: "/paisagismo-clinicas",
    icon: "local_florist",
  },
  {
    title: "Resorts Particulares",
    text: "Integração perfeita entre piscina, área gourmet e paisagismo tropical para você viver o luxo todos os dias.",
    href: "/area-gourmet-piscina",
    icon: "pool",
  },
  {
    title: "Gestão Botânica",
    text: "Manutenção técnica de alto nível para proteger o seu investimento e preservar a estética impecável do jardim.",
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
    title: "Residência de Luxo em Alphaville",
    cidade: "São Paulo, SP",
    metragem: "450m²",
    problema: "Área de lazer fria, sem identidade e desconectada da arquitetura da casa.",
    result: "Jardim tropical integrado à piscina, transformando o quintal em um resort particular para a família.",
    metric: "Valorização percebida: +18%",
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "Clínica Premium de Dermatologia",
    cidade: "Montes Claros, MG",
    metragem: "120m²",
    problema: "Recepção ansiosa e sem conforto visual para os pacientes de alto ticket.",
    result: "Paisagismo biofílico completo, criando um ambiente de acolhimento e transmitindo sofisticação instantânea.",
    metric: "Retenção e percepção de valor: Alto",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "Fachada & Entrada Monumental",
    cidade: "Belo Horizonte, MG",
    metragem: "200m²",
    problema: "Casa imponente, mas com fachada sem vida que não refletia o padrão interno.",
    result: "Composição botânica escultural que abraça a arquitetura e impacta desde a rua.",
    metric: "Destaque arquitetônico no condomínio",
    image: "https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=80&w=900",
  },
];

const testimonials = [
  {
    name: "Empresário, Alphaville",
    context: "Projeto Residencial Completo",
    text: "O nível de detalhe é absurdo. Nossa área externa virou literalmente um resort particular. Receber amigos agora é uma experiência completamente diferente, o jardim é a atração principal da casa.",
  },
  {
    name: "Diretora Médica",
    context: "Clínica de Estética Avançada",
    text: "A transformação foi imediata. Nossos pacientes agora entram e já sentem o nível de exclusividade que queríamos passar. O paisagismo elevou o ticket percebido e o conforto da clínica.",
  },
  {
    name: "Proprietário, Condomínio Fechado",
    context: "Retrofit de Área Externa",
    text: "Profissionalismo raro no mercado. A execução foi impecável, sem dor de cabeça, e o resultado final valorizou meu imóvel muito acima do investimento que fiz no projeto.",
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
            <a href="#servicos" className="hover:text-[#d7ae45] transition-colors">Serviços</a>
            <a href="#portfolio" className="hover:text-[#d7ae45] transition-colors">Portfólio</a>
            <a href="#metodo" className="hover:text-[#d7ae45] transition-colors">Método</a>
            <Link to="/guia-paisagismo" className="text-[#d7ae45] hover:text-white transition-colors">Guia Grátis</Link>
            <Link to="/contato" className="rounded-full bg-[#d7ae45] px-6 py-3 text-[#173727] hover:bg-white transition-colors">Agendar diagnóstico</Link>
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
        <section className="relative min-h-[100vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            poster="https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1920"
          >
            <source src="https://cdn.coverr.co/videos/coverr-luxury-home-with-a-pool-2122/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/85 to-[#173727]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173727] via-transparent to-[#173727]/30" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto grid min-h-[82vh] max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:px-8"
          >
            <div className="max-w-3xl">
              <p className="mb-6 text-[10px] font-extrabold uppercase tracking-[0.4em] text-[#d7ae45]">
                Arquitetura de jardins · Minas Gerais & São Paulo
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-[5.5rem] md:leading-[1.02]">
                Onde a natureza encontra a <span className="italic text-[#d7ae45]">sofisticação.</span>
              </h1>
              <p className="mt-8 max-w-xl text-[1.1rem] leading-[1.85] text-white/75 font-light">
                Paisagismo autoral para quem busca mais do que um jardim — busca uma experiência de viver. Projetos que valorizam a arquitetura, elevam o patrimônio e transformam o cotidiano.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/contato?utm_source=site&utm_medium=hero&utm_campaign=diagnostico"
                  className="rounded-full bg-[#d7ae45] px-10 py-5 text-center text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#173727] shadow-2xl shadow-black/20 hover:bg-white transition-all hover:scale-105"
                >
                  Solicitar projeto exclusivo
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/30 px-10 py-5 text-center text-[10px] font-extrabold uppercase tracking-[0.22em] text-white hover:border-[#d7ae45] hover:text-[#d7ae45] transition-all"
                >
                  Falar com especialista
                </a>
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-5">
              {[
                ["25+", "Anos de expertise"],
                ["200+", "Projetos assinados"],
                ["98%", "Índice de satisfação"],
              ].map(([value, label]) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="rounded-[20px] border border-white/10 bg-white/5 backdrop-blur-md px-8 py-6"
                >
                  <p className="font-display text-4xl font-bold text-[#d7ae45]">{value}</p>
                  <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/50">{label}</p>
                </motion.div>
              ))}
            </div>
            </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-white/40">Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
            >
              <div className="w-1 h-2 rounded-full bg-[#d7ae45]" />
            </motion.div>
          </motion.div>
          </section>

        <section className="bg-white px-5 py-14 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
            {[
              ["eco", "Projeto autoral"],
              ["local_florist", "Curadoria botânica"],
              ["architecture", "Execução orientada"],
              ["verified", "Manutenção premium"],
            ].map(([icon, item]) => (
              <div key={item} className="flex items-center gap-4 border-l-2 border-[#d7ae45] py-3 pl-6">
                <span className="material-symbols-outlined text-[#d7ae45] text-[18px]">{icon}</span>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#173727]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#fbfaf6] px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-6 text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#d7ae45]">Explore nossos serviços</p>
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
              <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#d7ae45]">Nosso expertise</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
                Cada projeto é uma experiência única, desenhada para transformar.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={service.href} className="group block h-full rounded-[24px] border border-stone-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <span className="material-symbols-outlined grid h-14 w-14 place-items-center rounded-2xl bg-[#fbfaf6] text-[28px] text-[#d7ae45] transition-colors group-hover:bg-[#173727]">{service.icon}</span>
                    <h3 className="mt-8 font-display text-2xl font-bold text-[#173727] leading-tight">{service.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-stone-500 group-hover:text-stone-600 transition-colors">{service.text}</p>
                    <div className="mt-8 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#b28a28] transition-colors group-hover:text-[#173727]">
                      <span>Solicitar avaliação</span>
                      <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="bg-[#173727] px-5 py-28 md:px-8 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#d7ae45]">Cases de sucesso</p>
                <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl text-white">Projetos que transformaram espaços — e valorizaram <span className="italic text-[#d7ae45]">patrimônios.</span></h2>
              </div>
              <Link to="/portfolio" className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#d7ae45] underline decoration-white/30 decoration-1 underline-offset-8 hover:text-white transition-colors">
                Ver portfólio completo →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {cases.map((item, index) => (
                <motion.article 
                  key={item.title} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group overflow-hidden rounded-[24px] bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#d7ae45]/30 shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <div className="overflow-hidden h-72 relative">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#d7ae45]">{item.cidade}</p>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/40">{item.metragem}</p>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white leading-tight">{item.title}</h3>
                    
                    <div className="mt-5 border-l-2 border-[#d7ae45]/40 pl-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-white/40 mb-1">Desafio</p>
                      <p className="text-sm leading-6 text-white/60">{item.problema}</p>
                    </div>
                    
                    <div className="mt-4 border-l-2 border-[#d7ae45] pl-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#d7ae45] mb-1">Resultado</p>
                      <p className="text-sm leading-6 text-white/80">{item.result}</p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/10">
                      <p className="inline-flex items-center gap-2 rounded-full bg-[#d7ae45]/10 border border-[#d7ae45]/20 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#d7ae45]">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                        {item.metric}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="metodo" className="grid bg-white md:grid-cols-2">
          <div className="px-5 py-24 md:px-12 lg:px-20">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#d7ae45]">Metodologia exclusiva</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">Do sonho à realidade, com previsibilidade total.</h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-stone-500 font-light">
              Você não compra apenas plantas — compra tranquilidade, valorização do imóvel e a certeza de que cada detalhe será executado com excelência. Da concepção à entrega, com acompanhamento pessoal.
            </p>
            <div className="mt-10 space-y-4">
              {["Briefing e Diagnóstico do Espaço", "Conceituação Botânica e Arquitetônica", "Detalhamento Técnico e Orçamentário", "Execução Orientada e Entrega"].map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={item} 
                  className="flex items-center gap-5 rounded-2xl border border-stone-100 bg-[#fbfaf6] p-5 shadow-sm transition-all hover:border-[#d7ae45]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#173727] text-sm font-bold text-[#d7ae45]">{index + 1}</span>
                  <span className="font-bold text-[#173727]">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[520px] bg-[#173727]">
            <img
              src="https://media.base44.com/images/public/69ea9c43ca6eb4180010c463/9825cfba9_IMG_7921jpg.jpg"
              alt="Rosane Borges, especialista em paisagismo"
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-x-6 bottom-6 rounded-[24px] bg-white/95 backdrop-blur-xl p-8 shadow-2xl md:inset-x-10 md:bottom-10 border border-white/50">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#d7ae45]">Fundadora & Diretora Criativa</p>
              <h3 className="mt-3 font-display text-3xl font-bold text-[#173727]">Rosane Borges</h3>
              <p className="mt-3 text-[0.95rem] leading-7 text-stone-500 font-light">
                Especialista em arquitetura de jardins com formação em produção vegetal e mais de duas décadas transformando espaços em experiências de alto padrão.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fbfaf6] px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-3xl">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#d7ae45]">Depoimentos</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
                Quem viveu a experiência, recomenda.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((item, index) => (
                <motion.article 
                  key={item.context} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative rounded-[24px] border border-stone-100 bg-white p-10 shadow-lg shadow-stone-200/50"
                >
                  <span className="absolute right-8 top-8 font-display text-8xl text-[#fbfaf6]">"</span>
                  <div className="relative z-10">
                    <div className="mb-6 flex gap-1 text-[#d7ae45]" aria-label="Avaliação 5 estrelas">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className="text-lg">★</span>
                      ))}
                    </div>
                    <p className="font-display text-[1.35rem] font-medium leading-[1.6] text-[#173727] italic">"{item.text}"</p>
                    <div className="mt-10 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#173727] flex items-center justify-center text-[#d7ae45] font-display font-bold text-xl">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-wider text-[#173727]">{item.name}</p>
                        <p className="mt-1 text-[10px] font-extrabold uppercase tracking-widest text-stone-400">{item.context}</p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-24 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#d7ae45]">Perguntas frequentes</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                Tudo que você precisa saber antes de começar.
              </h2>
              <p className="mt-5 text-[1.05rem] leading-8 text-stone-500 font-light">
                Transparência e clareza desde o primeiro contato. Confira as dúvidas mais comuns sobre nossos projetos e processos.
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

        {/* Before/After — prova social visual antes do CTA final */}
        <section className="bg-[#fbfaf6] px-5 py-28 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#d7ae45]">Antes & Depois</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl text-[#173727]">
                O poder da transformação.
              </h2>
              <p className="mt-4 text-lg text-stone-500 font-light max-w-2xl mx-auto">Arraste para revelar o resultado e sentir a diferença que um projeto autoral faz no patrimônio.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <BeforeAfterSlider 
                before="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=900" 
                after="https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=900" 
                labelBefore="Quintal sem vida"
                labelAfter="Resort particular"
              />
              <BeforeAfterSlider 
                before="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=900" 
                after="https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=80&w=900" 
                labelBefore="Entrada apagada"
                labelAfter="Fachada monumental"
              />
            </div>
          </div>
        </section>

        {/* CTA Final — depois de toda a prova social */}
        <section className="relative bg-[#173727] px-5 py-32 text-center text-white md:px-8 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#d7ae45]/5 to-transparent pointer-events-none" />
          <div className="mx-auto max-w-4xl relative z-10">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-[#d7ae45]">Próximo passo</p>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight md:text-[4rem] md:leading-[1.1]">
              Vamos criar algo <span className="italic text-[#d7ae45]">extraordinário</span> juntos?
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/60 font-light">
              Compartilhe sua visão. Nosso time de especialistas retorna com a melhor estratégia para transformar seu espaço em uma obra de arte viva.
            </p>
            <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
              <Link to="/contato?utm_source=site&utm_medium=cta_final&utm_campaign=diagnostico" className="rounded-full bg-[#d7ae45] px-10 py-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#173727] hover:bg-white transition-all hover:scale-105 shadow-xl">
                Solicitar projeto exclusivo
              </Link>
              <a href={`https://wa.me/${WHATSAPP}?text=${whatsappMessage}`} target="_blank" rel="noreferrer" className="rounded-full border border-white/25 px-10 py-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-white hover:border-[#d7ae45] hover:text-[#d7ae45] transition-all">
                Falar com especialista
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
      <EmailCapturePopup />
    </div>
  );
}
