import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Leaf,
  MapPin,
  MessageCircle,
  Ruler,
  Sparkles,
} from "lucide-react";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import MobileConciergeBar from "@/components/landing/home/MobileConciergeBar";
import BeforeAfterSlider from "@/components/landing/BeforeAfterSlider";
import SEO from "@/components/seo/SEO";
import { buildWhatsAppUrl, getProjectBySlug, premiumProjects } from "@/data/premiumProjects";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const labelClass =
  "text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8f7b55]";

export default function ProjetoPortfolio() {
  const reducedMotion = useReducedMotion();
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const relatedProjects = premiumProjects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  const heroStats = [
    { icon: MapPin, label: "Local", value: project.location },
    { icon: Ruler, label: "Área", value: project.area },
    { icon: Sparkles, label: "Escopo", value: project.scope },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.title} | Rosane Paisagismo`,
    description: project.summary,
    image: project.gallery,
    about: "Projeto de paisagismo de alto padrão",
    creator: {
      "@type": "Organization",
      name: "Rosane Paisagismo",
      url: "https://rosanepaisagismo-site.vercel.app",
    },
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#171914]">
      <SEO
        title={`${project.title} | Projeto de Paisagismo`}
        description={`${project.summary} Conheça desafios, solução aplicada e espécies utilizadas neste projeto autoral da Rosane Paisagismo.`}
        keywords={`${project.category}, paisagismo residencial, projetos de paisagismo, jardim moderno, paisagismo de luxo`}
        url={`https://rosanepaisagismo-site.vercel.app/portfolio/${project.slug}`}
        image={project.cover}
        schema={schema}
      />
      <SiteNav activeLink="portfolio" />

      <main>
        <section className="relative min-h-screen overflow-hidden bg-[#171914] text-white">
          <img
            src={project.cover}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,18,14,0.88),rgba(16,18,14,0.32)_54%,rgba(16,18,14,0.7)),linear-gradient(180deg,rgba(16,18,14,0.25),rgba(16,18,14,0.9))]" />

          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] flex-col justify-end px-4 pb-12 pt-32 md:pb-16">
            <motion.div
              initial={reducedMotion ? false : "hidden"}
              animate={reducedMotion ? undefined : "visible"}
              variants={reducedMotion ? undefined : fadeUp}
              className="w-full min-w-0 max-w-4xl"
            >
              <Link
                to="/portfolio"
                className="mb-8 inline-flex items-center gap-2 text-sm text-white/72 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Voltar ao portfólio
              </Link>
              <h1 className="max-w-[21rem] font-heading text-[2.55rem] font-medium leading-[0.98] tracking-normal sm:max-w-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                {project.title}
              </h1>
              <p className="mt-7 max-w-[21rem] text-lg font-light leading-8 text-white/78 sm:max-w-2xl md:text-xl">
                {project.summary}
              </p>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 22 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0 } : { delay: 0.18, duration: 0.7 }}
              className="mt-12 grid gap-3 border-t border-white/18 pt-6 sm:grid-cols-3"
            >
              {heroStats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="mt-1 h-4 w-4 text-[#d3b473]" aria-hidden="true" />
                  <div>
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-white/50">
                      {label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/82">{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-20 md:py-28">
          <div className="mx-auto grid w-[min(100%,1180px)] gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <motion.aside
              initial={reducedMotion ? false : "hidden"}
              whileInView={reducedMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-90px" }}
              variants={reducedMotion ? undefined : fadeUp}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <p className={labelClass}>Leitura do espaço</p>
              <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-5xl">
                Um case pensado como experiência, não como decoração.
              </h2>
              <p className="mt-6 text-base leading-8 text-[#5f665c]">
                Cada decisão combina estética, técnica e rotina. O resultado precisa ser bonito no
                primeiro olhar e consistente depois da implantação.
              </p>
              <a
                href={buildWhatsAppUrl(`Ola, quero iniciar uma avaliacao inspirada no projeto ${project.title}.`)}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#171914] px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#6f7b5f]"
              >
                Falar sobre meu projeto
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.aside>

            <div className="grid gap-5">
              {[
                ["Desafio", project.challenge],
                ["Solução aplicada", project.solution],
              ].map(([title, text], index) => (
                <motion.article
                  key={title}
                  initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { delay: index * 0.08, duration: 0.65 }
                  }
                  className="rounded-[8px] border border-[#dfd9cc] bg-white p-7 shadow-[0_20px_60px_rgba(36,35,28,0.06)] md:p-9"
                >
                  <p className={labelClass}>{title}</p>
                  <p className="mt-4 text-lg leading-8 text-[#343830]">{text}</p>
                </motion.article>
              ))}

              <motion.article
                initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.65 }}
                className="rounded-[8px] border border-[#dfd9cc] bg-[#171914] p-7 text-white shadow-[0_20px_60px_rgba(36,35,28,0.08)] md:p-9"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
                  Plantas utilizadas
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.plants.map((plant) => (
                    <div key={plant} className="flex items-center gap-3 text-white/82">
                      <Leaf className="h-4 w-4 text-[#d3b473]" aria-hidden="true" />
                      <span>{plant}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        <section className="bg-[#171914] px-4 py-20 text-white md:py-28">
          <div className="mx-auto w-[min(100%,1180px)]">
            <div className="mb-10 max-w-3xl">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
                Galeria fullscreen
              </p>
              <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
                Atmosfera, escala e detalhes do projeto.
              </h2>
            </div>

            <div className="grid gap-4">
              {project.gallery.map((image, index) => (
                <motion.figure
                  key={image}
                  initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { delay: index * 0.08, duration: 0.7 }
                  }
                  className="overflow-hidden rounded-[8px] bg-[#262a21]"
                >
                  <img
                    src={image}
                    alt={`${project.title} - imagem ${index + 1}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-[70vh] min-h-[420px] w-full object-cover"
                  />
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {project.beforeAfter && (
          <section className="px-4 py-20 md:py-28">
            <div className="mx-auto grid w-[min(100%,1180px)] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div>
                <p className={labelClass}>Antes e depois</p>
                <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-5xl">
                  Transformação com naturalidade.
                </h2>
                <p className="mt-6 text-base leading-8 text-[#5f665c]">
                  O objetivo é revelar o potencial do imóvel com uma composição que pareça
                  inevitável: integrada à arquitetura, ao uso e ao clima.
                </p>
              </div>
              <div className="overflow-hidden rounded-[8px] shadow-[0_30px_80px_rgba(36,35,28,0.14)]">
                <BeforeAfterSlider
                  before={project.beforeAfter.before}
                  after={project.beforeAfter.after}
                  labelBefore="Antes"
                  labelAfter="Depois"
                />
              </div>
            </div>
          </section>
        )}

        <section className="bg-white px-4 py-20 md:py-28">
          <div className="mx-auto w-[min(100%,1180px)]">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className={labelClass}>Outros projetos</p>
                <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-5xl">
                  Continue explorando a curadoria.
                </h2>
              </div>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#171914] transition hover:text-[#6f7b5f]"
              >
                Ver todos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {relatedProjects.map((item) => (
                <Link
                  key={item.slug}
                  to={`/portfolio/${item.slug}`}
                  className="group overflow-hidden rounded-[8px] border border-[#dfd9cc] bg-[#f8f6f2] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(36,35,28,0.12)]"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#171914]">
                    <img
                      src={item.cover}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <p className={labelClass}>{item.category}</p>
                    <h3 className="mt-2 font-heading text-2xl font-medium tracking-normal">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#5f665c]">{item.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#6f7b5f] px-4 py-20 text-white md:py-28">
          <img
            src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p5_i1.jpg"
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-[#171914]/58" />
          <div className="relative mx-auto max-w-4xl text-center">
            <Check className="mx-auto mb-7 h-8 w-8 text-[#d3b473]" aria-hidden="true" />
            <h2 className="font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
              Seu jardim pode ser o próximo espaço memorável.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/78">
              Envie fotos, planta ou referencias. A primeira leitura ja mostra o caminho mais
              elegante para transformar o espaco.
            </p>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
            >
              Iniciar avaliacao
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat hideOnMobile />
      <MobileConciergeBar href="/contato#briefing" />
    </div>
  );
}
