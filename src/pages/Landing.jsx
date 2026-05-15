import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Gem,
  Heart,
  Leaf,
  MessageCircle,
  Quote,
  ShieldCheck,
  Sparkles,
  ThermometerSun,
  Trees,
  Waves,
} from "lucide-react";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import EmailCapturePopup from "@/components/landing/EmailCapturePopup";
import SEO from "@/components/seo/SEO";
import { buildWhatsAppUrl, featuredProjects } from "@/data/premiumProjects";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const labelClass =
  "text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8f7b55]";

const services = [
  {
    icon: Trees,
    title: "Residencial",
    text: "Jardins autorais para casas, coberturas e condomínios de alto padrão.",
  },
  {
    icon: Waves,
    title: "Piscinas e áreas gourmet",
    text: "Áreas externas integradas para receber com conforto, sombra e presença.",
  },
  {
    icon: Building2,
    title: "Corporativo",
    text: "Fachadas, clínicas e ambientes de marca com biofilia sofisticada.",
  },
];

const process = [
  ["Briefing", "Leitura do imóvel, rotina, investimento e estilo desejado."],
  ["Estudo do espaço", "Insolação, solo, circulação, vistas e pontos de permanência."],
  ["Conceito paisagístico", "Atmosfera, paleta botânica, materiais e narrativa visual."],
  ["Projeto executivo", "Detalhamento técnico para implantação com clareza."],
  ["Implantação", "Acompanhamento de fornecedores, compras e execução."],
  ["Acompanhamento", "Ajustes finais, orientações de cuidado e evolução do jardim."],
];

const benefits = [
  {
    icon: Gem,
    title: "Valorização do imóvel",
    text: "A área externa passa a comunicar padrão e cuidado.",
  },
  {
    icon: Heart,
    title: "Bem-estar",
    text: "Espaços vivos para respirar, contemplar e receber melhor.",
  },
  {
    icon: ThermometerSun,
    title: "Conforto térmico",
    text: "Vegetação pensada para sombra, frescor e permanência.",
  },
  {
    icon: Sparkles,
    title: "Sofisticação visual",
    text: "Composição botânica alinhada à arquitetura.",
  },
  {
    icon: Leaf,
    title: "Conexão com a natureza",
    text: "Texturas, aromas e movimentos naturais no cotidiano.",
  },
  {
    icon: ShieldCheck,
    title: "Exclusividade",
    text: "Cada escolha nasce do imóvel, da rotina e do desejo do cliente.",
  },
];

const testimonials = [
  {
    name: "Ana Paula F.",
    role: "Residência de alto padrão",
    text: "A área externa se tornou o lugar mais especial da casa. O projeto trouxe beleza, sombra e uma sensação de refúgio que não existia antes.",
  },
  {
    name: "Ricardo M.",
    role: "Clínica premium",
    text: "A fachada passou a comunicar exatamente o padrão que buscávamos. Os pacientes comentam a sensação de acolhimento logo na chegada.",
  },
  {
    name: "Construtora Ávila",
    role: "Empreendimento residencial",
    text: "O paisagismo elevou a percepção de valor do produto e trouxe uma assinatura visual muito mais sofisticada para o lançamento.",
  },
];

function PremiumLink({ to = "", href = "", children, variant = "dark", className = "" }) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition duration-300 hover:-translate-y-0.5";
  const variants = {
    dark: "bg-[#171914] text-white hover:bg-[#6f7b5f]",
    light: "bg-white text-[#171914] hover:bg-[#d3b473]",
    outline: "border border-white/34 text-white hover:bg-white/10",
  };
  const content = (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return <Link to={to}>{content}</Link>;
}

export default function Landing() {
  const [lead, setLead] = useState({
    name: "",
    city: "",
    interest: "Projeto residencial",
  });

  const submitLead = (event) => {
    event.preventDefault();
    const message = `Olá, sou ${lead.name || "cliente"} de ${
      lead.city || "minha cidade"
    }. Quero solicitar atendimento para ${lead.interest}.`;
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f6f2] text-[#171914]">
      <SEO
        title="Paisagismo Residencial de Alto Padrão"
        description="Projetos autorais de paisagismo que unem natureza, arquitetura e sofisticação para residências, piscinas, áreas gourmet, jardins verticais e espaços corporativos."
        keywords="paisagismo residencial, paisagista, projetos de paisagismo, jardim moderno, paisagismo de luxo, paisagismo residencial alto padrão"
        schema={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Rosane Borges Paisagismo",
          description:
            "Projetos autorais de paisagismo de alto padrão para residências, áreas gourmet, piscinas, jardins verticais e espaços corporativos.",
          url: "https://rosanepaisagismo-site.vercel.app",
          telephone: "+55 38 99931-3930",
          areaServed: ["Minas Gerais", "São Paulo", "Brasil"],
          sameAs: ["https://www.instagram.com/rosanepaisagismo/"],
        }}
      />
      <SiteNav activeLink="inicio" />

      <main>
        <section className="relative min-h-[92svh] overflow-hidden bg-[#171914] text-white">
          <motion.img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=90&w=2200"
            alt="Jardim contemporâneo integrado à arquitetura residencial"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,17,13,0.86),rgba(15,17,13,0.22)_55%,rgba(15,17,13,0.62)),linear-gradient(180deg,rgba(15,17,13,0.2),rgba(15,17,13,0.88))]" />

          <div className="relative z-10 mx-auto flex min-h-[92svh] w-full max-w-[1180px] items-end px-4 pb-12 pt-32 md:pb-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="w-full min-w-0 max-w-4xl"
            >
              <motion.h1
                variants={fadeUp}
                className="max-w-[21rem] font-heading text-[2.82rem] font-medium leading-[0.98] tracking-normal sm:max-w-4xl sm:text-6xl md:text-7xl lg:text-8xl"
              >
                Transformamos espaços em experiências vivas.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-[21rem] text-lg font-light leading-8 text-white/78 sm:max-w-2xl md:text-xl"
              >
                Projetos autorais de paisagismo que unem natureza, arquitetura e
                sofisticação.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
                <PremiumLink to="/contato" variant="light">
                  Solicitar projeto
                </PremiumLink>
                <PremiumLink href="#projetos" variant="outline">
                  Ver projetos
                </PremiumLink>
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="mt-12 grid w-full max-w-[21rem] grid-cols-3 gap-3 border-t border-white/18 pt-6 sm:max-w-2xl sm:gap-4"
              >
                {[
                  ["10+", "anos de experiência"],
                  ["200+", "projetos planejados"],
                  ["SP + MG", "atuação selecionada"],
                ].map(([number, text]) => (
                  <div key={number}>
                    <p className="whitespace-nowrap font-heading text-2xl font-medium tracking-normal sm:text-3xl md:text-4xl">
                      {number}
                    </p>
                    <p className="mt-2 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-white/56">
                      {text}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="sobre" className="px-4 py-20 md:py-28">
          <div className="mx-auto grid w-[min(100%,1180px)] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-90px" }}
              variants={fadeUp}
            >
              <p className={labelClass}>Rosane Borges</p>
              <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
                Técnica, sensibilidade e leitura profunda da natureza.
              </h2>
              <p className="mt-7 text-lg leading-8 text-[#5f665c]">
                Doutora em Produção Vegetal, Rosane combina conhecimento botânico,
                experiência de obra e olhar autoral para criar jardins que amadurecem bem
                com o tempo. O processo integra arquitetura, rotina, clima, solo e desejo
                estético em uma composição precisa.
              </p>
              <div className="mt-9 grid gap-4 sm:grid-cols-3">
                {[
                  ["Autoridade", "Base técnica para decisões seguras."],
                  ["Autoria", "Projetos desenhados para cada imóvel."],
                  ["Presença", "Jardins pensados para serem vividos."],
                ].map(([title, text]) => (
                  <div key={title} className="border-l border-[#c8b88d] pl-4">
                    <h3 className="font-semibold text-[#171914]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6b7168]">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[8px] bg-[#d9d1bd] shadow-[0_30px_80px_rgba(36,35,28,0.12)]"
            >
              <img
                src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=88&w=1400"
                alt="Processo de criação paisagística com estudo botânico"
                loading="lazy"
                decoding="async"
                className="h-[520px] w-full object-cover"
              />
            </motion.figure>
          </div>
        </section>

        <section id="projetos" className="bg-white px-4 py-20 md:py-28">
          <div className="mx-auto w-[min(100%,1180px)]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-90px" }}
              variants={fadeUp}
              className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
            >
              <div className="max-w-3xl">
                <p className={labelClass}>Portfólio editorial</p>
                <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
                  Projetos que fazem a área externa parecer inevitável.
                </h2>
              </div>
              <PremiumLink to="/portfolio">Ver portfólio</PremiumLink>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <motion.article
                  key={project.slug}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{ delay: index * 0.06, duration: 0.68 }}
                  className={index % 2 === 1 ? "md:translate-y-12" : ""}
                >
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="group block overflow-hidden rounded-[8px] bg-[#171914]"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
                      <img
                        src={project.cover}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#11130f]/82 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
                          {project.category} · {project.area}
                        </p>
                        <h3 className="mt-3 font-heading text-3xl font-medium tracking-normal md:text-4xl">
                          {project.title}
                        </h3>
                        <p className="mt-3 max-w-lg text-sm leading-6 text-white/72">
                          {project.summary}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="servicos" className="px-4 py-20 md:py-28">
          <div className="mx-auto w-[min(100%,1180px)]">
            <div className="mb-12 max-w-3xl">
              <p className={labelClass}>Expertise</p>
              <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
                Paisagismo com impacto visual e precisão técnica.
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.article
                    key={service.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: index * 0.08, duration: 0.65 }}
                    className="rounded-[8px] border border-[#dfd9cc] bg-white p-7 shadow-[0_18px_55px_rgba(36,35,28,0.06)]"
                  >
                    <Icon className="h-7 w-7 text-[#6f7b5f]" aria-hidden="true" />
                    <h3 className="mt-8 font-heading text-3xl font-medium tracking-normal">
                      {service.title}
                    </h3>
                    <p className="mt-4 leading-7 text-[#5f665c]">{service.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#171914] px-4 py-20 text-white md:py-28">
          <div className="mx-auto grid w-[min(100%,1180px)] gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
                Processo
              </p>
              <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
                Um caminho claro da primeira conversa à implantação.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/68">
                A experiência foi desenhada para reduzir ruído, orientar decisões e
                proteger a qualidade final do jardim.
              </p>
            </div>
            <div className="grid gap-4">
              {process.map(([title, text], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.06, duration: 0.62 }}
                  className="grid grid-cols-[3rem_1fr] gap-5 border-b border-white/12 pb-5"
                >
                  <span className="font-heading text-3xl font-medium text-[#d3b473]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 leading-7 text-white/62">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 md:py-28">
          <div className="mx-auto w-[min(100%,1180px)]">
            <div className="mb-12 max-w-3xl">
              <p className={labelClass}>Valor percebido</p>
              <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
                O jardim certo muda o modo como o imóvel é sentido.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map(({ icon: Icon, title, text }, index) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.05, duration: 0.62 }}
                  className="rounded-[8px] border border-[#dfd9cc] bg-[#f8f6f2] p-6"
                >
                  <Icon className="h-6 w-6 text-[#6f7b5f]" aria-hidden="true" />
                  <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5f665c]">{text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="depoimentos" className="px-4 py-20 md:py-28">
          <div className="mx-auto w-[min(100%,1180px)]">
            <div className="mb-12 max-w-3xl">
              <p className={labelClass}>Clientes</p>
              <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
                Prova social com a calma de quem entrega resultado.
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.figure
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.08, duration: 0.62 }}
                  className="rounded-[8px] border border-[#dfd9cc] bg-white p-7 shadow-[0_18px_55px_rgba(36,35,28,0.05)]"
                >
                  <div className="mb-7 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#171914] font-heading text-xl text-white">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="flex gap-1 text-[#b9954e]" aria-label="Avaliação cinco estrelas">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Sparkles key={starIndex} className="h-3.5 w-3.5" aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                  <Quote className="mb-5 h-6 w-6 text-[#8f7b55]" aria-hidden="true" />
                  <blockquote className="text-base leading-8 text-[#4d534b]">
                    “{testimonial.text}”
                  </blockquote>
                  <figcaption className="mt-7">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
                      {testimonial.role}
                    </p>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 md:py-28">
          <div className="mx-auto grid w-[min(100%,1180px)] overflow-hidden rounded-[8px] border border-[#dfd9cc] bg-[#171914] text-white shadow-[0_30px_90px_rgba(36,35,28,0.16)] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[360px]">
              <img
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=88&w=1600"
                alt="Área externa residencial com jardim e piscina"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#171914]/20" />
            </div>
            <div className="p-7 md:p-10 lg:p-12">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
                Atendimento
              </p>
              <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-5xl">
                Seu jardim pode ser o espaço mais extraordinário da sua casa.
              </h2>
              <p className="mt-5 leading-7 text-white/68">
                Envie uma primeira intenção. A equipe retorna pelo WhatsApp para entender o
                espaço, a fase da obra e o caminho mais elegante para o projeto.
              </p>
              <form onSubmit={submitLead} className="mt-8 grid gap-3">
                <input
                  value={lead.name}
                  onChange={(event) => setLead((prev) => ({ ...prev, name: event.target.value }))}
                  className="min-h-12 rounded-[8px] border border-white/16 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/42 focus:border-[#d3b473]"
                  placeholder="Seu nome"
                  aria-label="Seu nome"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    value={lead.city}
                    onChange={(event) => setLead((prev) => ({ ...prev, city: event.target.value }))}
                    className="min-h-12 rounded-[8px] border border-white/16 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/42 focus:border-[#d3b473]"
                    placeholder="Cidade"
                    aria-label="Cidade"
                  />
                  <select
                    value={lead.interest}
                    onChange={(event) =>
                      setLead((prev) => ({ ...prev, interest: event.target.value }))
                    }
                    className="min-h-12 rounded-[8px] border border-white/16 bg-white/10 px-4 text-sm text-white outline-none transition focus:border-[#d3b473]"
                    aria-label="Interesse"
                  >
                    <option className="text-[#171914]">Projeto residencial</option>
                    <option className="text-[#171914]">Área gourmet ou piscina</option>
                    <option className="text-[#171914]">Jardim vertical</option>
                    <option className="text-[#171914]">Clínica ou corporativo</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
                >
                  Solicitar atendimento
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
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
