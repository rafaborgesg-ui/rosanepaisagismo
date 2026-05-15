import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Filter, MapPin, Ruler, Sparkles } from "lucide-react";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import MobileConciergeBar from "@/components/landing/home/MobileConciergeBar";
import SEO from "@/components/seo/SEO";
import { buildWhatsAppUrl, portfolioCategories, premiumProjects } from "@/data/premiumProjects";

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

function getProjectFacts(project) {
  return [
    { icon: MapPin, label: "Local", value: project.location },
    { icon: Ruler, label: "Área", value: project.area },
    { icon: Sparkles, label: "Escopo", value: project.scope },
  ];
}

export default function Portfolio() {
  const reducedMotion = useReducedMotion();
  const [filter, setFilter] = useState("Todos");

  const filteredProjects = useMemo(() => {
    if (filter === "Todos") return premiumProjects;
    return premiumProjects.filter((project) => project.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f6f2] text-[#171914]">
      <SEO
        title="Projetos Selecionados de Paisagismo Autoral"
        description="Explore estudos, implantacoes orientadas e projetos autorais de paisagismo para residencias de alto padrao assinados pela Rosane Paisagismo."
        keywords="projetos selecionados paisagismo, paisagismo autoral, estudo 3d paisagismo, implantacao orientada, paisagismo residencial"
        url="https://rosanepaisagismo-site.vercel.app/portfolio"
        image={premiumProjects[0].cover}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Portfólio Rosane Paisagismo",
          description:
            "Seleção editorial de projetos de paisagismo de alto padrão.",
          hasPart: premiumProjects.map((project) => ({
            "@type": "CreativeWork",
            name: project.title,
            url: `https://rosanepaisagismo-site.vercel.app/portfolio/${project.slug}`,
          })),
        }}
      />
      <SiteNav activeLink="portfolio" />

      <main>
        <header className="relative min-h-[88svh] overflow-hidden bg-[#171914] text-white">
          <img
            src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p6_i2.jpg"
            alt="Estudo de fachada residencial com paisagismo autoral"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,18,14,0.9),rgba(16,18,14,0.34)_55%,rgba(16,18,14,0.68)),linear-gradient(180deg,rgba(16,18,14,0.18),rgba(16,18,14,0.88))]" />
          <motion.div
            initial={reducedMotion ? false : "hidden"}
            animate={reducedMotion ? undefined : "visible"}
            variants={reducedMotion ? undefined : fadeUp}
            className="relative z-10 mx-auto flex min-h-[88svh] w-full max-w-[1180px] flex-col justify-end px-4 pb-12 pt-32 md:pb-16"
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
              Projetos selecionados
            </p>
            <h1 className="mt-5 max-w-[21rem] font-heading text-[2.55rem] font-medium leading-[0.98] tracking-normal sm:max-w-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Estudos e obras com assinatura botanica.
            </h1>
            <p className="mt-7 max-w-[21rem] text-lg font-light leading-8 text-white/76 sm:max-w-2xl md:text-xl">
              Acervo real com foco em fachada, percurso, permanencia e leitura
              arquitetonica da area externa.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={buildWhatsAppUrl("Ola, quero iniciar uma avaliacao inspirada nos projetos selecionados da Rosane Paisagismo.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
              >
                  Iniciar avaliacao
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#galeria"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/34 px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                  Ver acervo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </header>

        <section className="sticky top-[72px] z-30 border-b border-[#dfd9cc] bg-[#f8f6f2]/92 px-4 py-4 backdrop-blur-xl">
          <div className="mx-auto flex w-[min(100%,1180px)] items-center gap-3 overflow-x-auto">
            <Filter className="h-4 w-4 shrink-0 text-[#8f7b55]" aria-hidden="true" />
            {portfolioCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`whitespace-nowrap rounded-full px-5 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.12em] transition ${
                  filter === category
                    ? "bg-[#171914] text-white"
                    : "bg-white text-[#5f665c] hover:bg-[#e8e2d5] hover:text-[#171914]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section id="galeria" className="px-4 py-20 md:py-28">
          <div className="mx-auto w-[min(100%,1180px)]">
            <div className="mb-12 grid gap-7 md:grid-cols-[1fr_0.55fr] md:items-end">
              <div>
                <p className={labelClass}>Galeria selecionada</p>
                <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
                  Composicoes reais, leitura tecnica e narrativa visual.
                </h2>
              </div>
              <p className="text-base leading-8 text-[#5f665c]">
                Cada estudo apresenta contexto, solucao aplicada e escopo tecnico para
                orientar decisoes de projeto e implantacao.
              </p>
            </div>

            <motion.div layout className="grid gap-5 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    layout
                    key={project.slug}
                    initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                    animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: 16 }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { delay: index * 0.04, duration: 0.55 }
                    }
                    className={index % 2 === 1 ? "md:translate-y-12" : ""}
                  >
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="group block overflow-hidden rounded-[8px] bg-white shadow-[0_24px_70px_rgba(36,35,28,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(36,35,28,0.14)]"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#171914] md:aspect-[5/6]">
                        <img
                          src={project.cover}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover opacity-92 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#11130f]/84 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
                            {project.category}
                          </p>
                          <h3 className="mt-3 font-heading text-3xl font-medium tracking-normal md:text-4xl">
                            {project.title}
                          </h3>
                          <p className="mt-3 max-w-lg text-sm leading-6 text-white/74">
                            {project.summary}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 p-5">
                        {getProjectFacts(project).map(({ icon: Icon, label, value }) => (
                          <div key={label}>
                            <Icon className="mb-3 h-4 w-4 text-[#8f7b55]" aria-hidden="true" />
                            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
                              {label}
                            </p>
                            <p className="mt-1 text-sm leading-5 text-[#33372f]">{value}</p>
                          </div>
                        ))}
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#171914] px-4 py-20 text-white md:py-28">
          <img
            src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p9_i1.jpg"
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-24"
          />
          <div className="absolute inset-0 bg-[#171914]/72" />
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
              Próximo projeto
            </p>
            <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
              O proximo projeto pode ser o seu imovel.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Envie fotos, planta ou referencias. A primeira leitura identifica
              aderencia, escopo e proximo passo.
            </p>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
            >
              Solicitar atendimento privado
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
