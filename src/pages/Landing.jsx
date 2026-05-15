import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck,
  Leaf,
  Menu,
  Sparkles,
  Trees,
  Waves,
  X,
} from "lucide-react";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import EmailCapturePopup from "@/components/landing/EmailCapturePopup";
import BeforeAfterSlider from "@/components/landing/BeforeAfterSlider";
import SEO from "@/components/seo/SEO";

const BRAND = {
  white: "#ffffff",
  paper: "#f7f7f3",
  ink: "#121411",
  forest: "#163528",
  moss: "#60715f",
  gold: "#b89445",
};

const SERVICES = [
  {
    icon: Trees,
    category: "Residências de alto padrão",
    title: "Jardins autorais para casas, coberturas e condomínios",
    desc: "Composição botânica, circulação, iluminação e áreas de permanência desenhadas para ampliar conforto, privacidade e valor percebido.",
    link: "/paisagismo-residencial",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=85&w=1200",
  },
  {
    icon: Waves,
    category: "Piscinas e áreas gourmet",
    title: "Exteriores integrados para receber com sofisticação",
    desc: "Lounge, piscina, gourmet e jardim em uma narrativa única, com textura, sombra, aroma e iluminação cênica para uso real.",
    link: "/contato?interesse=Áreas+Gourmet+%26+Piscinas",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=85&w=1200",
  },
  {
    icon: Building2,
    category: "Clínicas e corporativo",
    title: "Biofilia premium para marcas que recebem pessoas",
    desc: "Paisagismo para fachadas, recepções e áreas de espera, reforçando acolhimento, autoridade e experiência de marca.",
    link: "/paisagismo-clinicas",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=85&w=1200",
  },
];

const CASES = [
  {
    title: "Residência Horizonte",
    location: "Lago Sul",
    desc: "Jardim tropical contemporâneo com piscina, percurso noturno e área gourmet integrada.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=85&w=1400",
    metric: "1.400 m²",
  },
  {
    title: "Cobertura Jardins",
    location: "São Paulo",
    desc: "Refúgio suspenso com espécies esculturais, vasos sob medida e iluminação discreta.",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=85&w=1400",
    metric: "360 m²",
  },
  {
    title: "Clínica Essenza",
    location: "Montes Claros",
    desc: "Recepção biofílica com jardim sensorial para elevar acolhimento e confiança.",
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=85&w=1400",
    metric: "Projeto + execução",
  },
  {
    title: "Casa Reserva",
    location: "Condomínio fechado",
    desc: "Paisagismo de baixa manutenção com camadas verdes, privacidade e presença arquitetônica.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=85&w=1400",
    metric: "Entrega completa",
  },
];

const TESTIMONIALS = [
  {
    name: "Ana Paula F.",
    role: "Residência de alto padrão",
    text: "O projeto mudou a forma como usamos a casa. A área externa virou o lugar mais desejado para receber família e amigos.",
  },
  {
    name: "Ricardo M.",
    role: "Clínica premium",
    text: "A fachada e a recepção passaram a comunicar exatamente o padrão que queríamos. Os pacientes comentam todos os dias.",
  },
  {
    name: "Construtora Ávila",
    role: "Empreendimento residencial",
    text: "O paisagismo elevou a percepção de valor do produto e trouxe uma assinatura visual muito mais sofisticada para o lançamento.",
  },
];

const PROCESS = [
  "Imersão no imóvel, rotina e arquitetura existente",
  "Conceito visual, paleta botânica e diretrizes de iluminação",
  "Projeto executivo, fornecedores e acompanhamento de implantação",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const WhatsAppLink = "https://wa.me/5538999313930?text=Ol%C3%A1%2C%20quero%20agendar%20uma%20consultoria%20para%20um%20projeto%20exclusivo%20de%20paisagismo.";

function PremiumButton({ to, href, children, variant = "primary", className = "" }) {
  const classes =
    variant === "light"
      ? "bg-white text-[#121411] hover:bg-[#b89445] hover:text-white"
      : variant === "ghost"
      ? "border border-white/25 text-white hover:bg-white/10"
      : "bg-[#121411] text-white hover:bg-[#b89445]";

  const content = (
    <span className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 ${classes} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </span>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return <Link to={to}>{content}</Link>;
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#121411] selection:bg-[#b89445] selection:text-white">
      <SEO
        title="Paisagismo de Alto Padrão | Projetos Exclusivos"
        description="Rosane Paisagismo cria projetos autorais para jardins, piscinas, áreas gourmet, clínicas e residências de alto padrão. Atendimento em SP, MG e projetos selecionados no Brasil."
        keywords="paisagismo de alto padrão, projeto de jardim premium, paisagismo residencial, jardim com piscina, área gourmet, paisagismo para clínica, Rosane Paisagismo"
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Rosane Paisagismo",
          description: "Projetos autorais de paisagismo de alto padrão para residências, clínicas e áreas externas premium.",
          url: "https://rosanepaisagismo.com",
          areaServed: ["São Paulo", "Minas Gerais", "Brasil"],
          sameAs: ["https://www.instagram.com/rosanepaisagismo/"],
        }}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap');
        .font-editorial { font-family: 'Playfair Display', Georgia, serif; }
        .font-premium { font-family: 'Inter', system-ui, sans-serif; }
        .luxury-container { width: min(100% - 2rem, 1180px); margin-inline: auto; }
        .image-elevate { transform: translateZ(0); }
      `}</style>

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#121411]/55 font-premium text-white backdrop-blur-2xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <a href="/" className="text-[1.35rem] font-semibold tracking-tight md:text-[1.55rem]" aria-label="Rosane Paisagismo">
            Rosane<span className="text-[#b89445]">.</span>
          </a>

          <div className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72 lg:flex">
            <a href="#projetos" className="transition-colors hover:text-white">Portfólio</a>
            <a href="#servicos" className="transition-colors hover:text-white">Expertise</a>
            <a href="#sobre" className="transition-colors hover:text-white">Método</a>
            <a href="#depoimentos" className="transition-colors hover:text-white">Clientes</a>
            <Link to="/contato" className="rounded-full bg-white px-6 py-3 text-[#121411] transition-all hover:-translate-y-0.5 hover:bg-[#b89445] hover:text-white">
              Agendar consultoria
            </Link>
          </div>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="border-t border-white/10 bg-[#121411]/96 px-6 py-6 text-center font-premium text-xs font-semibold uppercase tracking-[0.18em] text-white/80 lg:hidden"
            >
              <div className="grid gap-5">
                <a href="#projetos" onClick={() => setMenuOpen(false)}>Portfólio</a>
                <a href="#servicos" onClick={() => setMenuOpen(false)}>Expertise</a>
                <a href="#sobre" onClick={() => setMenuOpen(false)}>Método</a>
                <Link to="/contato" className="text-[#d5bd7b]" onClick={() => setMenuOpen(false)}>Agendar consultoria</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="font-premium">
        <section className="relative min-h-[760px] overflow-hidden bg-[#121411] text-white md:min-h-screen">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=1920"
            className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-80"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-of-a-house-with-a-pool-39744-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,20,17,0.88),rgba(18,20,17,0.38)_48%,rgba(18,20,17,0.68)),linear-gradient(180deg,rgba(18,20,17,0.45),rgba(18,20,17,0.08)_36%,rgba(18,20,17,0.92))]" />

          <div className="luxury-container relative z-10 flex min-h-[760px] items-center pt-24 md:min-h-screen">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl pb-16"
            >
              <motion.h1 variants={fadeUp} className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.03em] md:text-7xl lg:text-[5.7rem]">
                Jardins exclusivos que valorizam arquitetura, patrimônio e lifestyle.
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-base font-light leading-8 text-white/78 md:text-xl">
                Paisagismo autoral para residências, piscinas, áreas gourmet e clínicas que precisam transmitir presença, conforto e sofisticação desde o primeiro olhar.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
                <PremiumButton to="/contato" variant="light">Solicitar projeto exclusivo</PremiumButton>
                <PremiumButton href={WhatsAppLink} variant="ghost">Falar com especialista</PremiumButton>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-14 grid max-w-2xl grid-cols-3 gap-5 border-t border-white/16 pt-8">
                {[
                  ["200+", "projetos planejados"],
                  ["25 anos", "de experiência"],
                  ["SP + MG", "atendimento premium"],
                ].map(([num, label]) => (
                  <div key={num}>
                    <p className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{num}</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">{label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-24 md:py-32" id="sobre">
          <div className="luxury-container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={fadeUp}>
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#b89445]">A experiência Rosane</p>
              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
                Natureza desenhada como extensão da arquitetura.
              </h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={fadeUp} className="space-y-8 text-[#4c524b]">
              <p className="text-lg font-light leading-8">
                Um projeto premium não nasce de excesso. Ele nasce de decisões precisas: espécies certas, proporções elegantes, iluminação discreta, materiais coerentes e uma implantação pensada para o uso real do espaço.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Exclusividade", "Projetos sob medida para rotina, arquitetura e investimento."],
                  ["Autoridade", "Leitura técnica de solo, insolação, manutenção e execução."],
                  ["Emoção", "Ambientes externos que convidam a permanecer, receber e contemplar."],
                ].map(([title, desc]) => (
                  <div key={title} className="border-l border-[#b89445]/45 pl-5">
                    <h3 className="font-semibold text-[#121411]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#697067]">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#f7f7f3] py-24 md:py-32" id="servicos">
          <div className="luxury-container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#b89445]">Expertise</p>
                <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">Projetos para viver melhor ao ar livre.</h2>
              </div>
              <PremiumButton to="/contato">Agendar consultoria</PremiumButton>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
              {SERVICES.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.article
                    key={service.title}
                    initial={{ opacity: 0, y: 34 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="group overflow-hidden rounded-[28px] bg-white shadow-[0_24px_70px_rgba(18,20,17,0.08)]"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#121411]">
                      <img src={service.image} alt={service.title} loading="lazy" className="image-elevate h-full w-full object-cover opacity-88 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                    </div>
                    <div className="p-8">
                      <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-[#163528] text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b89445]">{service.category}</p>
                      <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em]">{service.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-[#626960]">{service.desc}</p>
                      <Link to={service.link} className="mt-7 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#163528] transition-colors hover:text-[#b89445]">
                        Ver solução <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#121411] py-24 text-white md:py-32" id="projetos">
          <div className="luxury-container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div className="max-w-3xl">
                <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#d5bd7b]">Portfólio premium</p>
                <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">Uma galeria feita para inspirar decisão.</h2>
              </div>
              <Link to="/portfolio" className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/65 transition-colors hover:text-white">
                Ver portfólio completo <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <div className="grid gap-7 md:grid-cols-2">
              {CASES.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.75 }}
                  className={`group ${index % 2 === 1 ? "md:translate-y-16" : ""}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] bg-[#1f231d] md:aspect-[5/6]">
                    <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover opacity-82 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                    <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d5bd7b]">{project.location} · {project.metric}</p>
                      <h3 className="text-3xl font-semibold tracking-[-0.03em]">{project.title}</h3>
                      <p className="mt-3 max-w-md text-sm leading-6 text-white/72">{project.desc}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24 md:py-32">
          <div className="luxury-container">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#b89445]">Antes e depois</p>
                <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">Transformação visível, sem perder naturalidade.</h2>
                <p className="mt-6 text-lg font-light leading-8 text-[#626960]">
                  O objetivo não é apenas deixar bonito. É revelar o potencial do imóvel, criar permanência e fazer a área externa parecer parte inevitável da arquitetura.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.85 }} className="overflow-hidden rounded-[30px] shadow-[0_30px_90px_rgba(18,20,17,0.14)]">
                <BeforeAfterSlider
                  before="https://images.unsplash.com/photo-1590011502447-90977f6b9571?auto=format&fit=crop&q=85&w=1400"
                  after="https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=85&w=1400"
                  labelBefore="Potencial bruto"
                  labelAfter="Experiência final"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f7f3] py-24 md:py-32">
          <div className="luxury-container grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#b89445]">Método de entrega</p>
              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">Um processo claro para uma obra mais tranquila.</h2>
              <p className="mt-6 text-lg font-light leading-8 text-[#626960]">
                Do conceito à implantação, a experiência foi pensada para reduzir incertezas e transformar referências soltas em um projeto executável, elegante e duradouro.
              </p>
            </motion.div>
            <div className="space-y-4">
              {PROCESS.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.65 }}
                  className="flex gap-5 rounded-[22px] bg-white p-6 shadow-[0_18px_55px_rgba(18,20,17,0.06)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#163528] text-sm font-semibold text-white">{index + 1}</div>
                  <div>
                    <h3 className="font-semibold tracking-[-0.01em]">{step}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#697067]">Cada etapa gera clareza visual e técnica para proteger o investimento e elevar o resultado final.</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24 md:py-32" id="depoimentos">
          <div className="luxury-container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mx-auto mb-14 max-w-3xl text-center">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#b89445]">Prova social</p>
              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">Clientes que buscavam mais do que um jardim.</h2>
            </motion.div>
            <div className="grid gap-5 md:grid-cols-3">
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.figure
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.7 }}
                  className="rounded-[26px] border border-[#e7e5dc] bg-white p-8 shadow-[0_20px_60px_rgba(18,20,17,0.05)]"
                >
                  <BadgeCheck className="mb-7 h-6 w-6 text-[#b89445]" aria-hidden="true" />
                  <blockquote className="text-base font-light leading-8 text-[#4c524b]">"{testimonial.text}"</blockquote>
                  <figcaption className="mt-8">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a9188]">{testimonial.role}</p>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#163528] px-5 py-24 text-white md:py-32">
          <div className="absolute inset-0 opacity-35">
            <img
              src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=85&w=1800"
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[#163528]/82" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 mx-auto max-w-4xl text-center"
          >
            <Sparkles className="mx-auto mb-8 h-8 w-8 text-[#d5bd7b]" aria-hidden="true" />
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">Seu imóvel pode ter uma área externa à altura da sua arquitetura.</h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg font-light leading-8 text-white/74">
              Envie sua ideia, fotos ou planta. A equipe avalia o potencial do espaço e indica o melhor caminho para um projeto exclusivo.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <PremiumButton to="/contato" variant="light">Solicitar projeto exclusivo</PremiumButton>
              <PremiumButton href={WhatsAppLink} variant="ghost">Falar com especialista</PremiumButton>
            </div>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
      <EmailCapturePopup />
    </div>
  );
}
