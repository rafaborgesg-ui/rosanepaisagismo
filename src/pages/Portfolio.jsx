import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Filter, MapPin, Ruler, Sparkles } from "lucide-react";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
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
  const [filter, setFilter] = useState("Todos");

  const filteredProjects = useMemo(() => {
    if (filter === "Todos") return premiumProjects;
    return premiumProjects.filter((project) => project.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f6f2] text-[#171914]">
      <SEO
        title="Portfólio de Paisagismo de Alto Padrão"
        description="Explore projetos autorais de paisagismo residencial, corporativo, jardins verticais, piscinas e áreas gourmet criados pela Rosane Paisagismo."
        keywords="portfólio paisagismo, projetos de paisagismo, paisagismo residencial alto padrão, jardim moderno, paisagismo de luxo"
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
            src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=90&w=2200"
            alt="Piscina e jardim residencial de alto padrão"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,18,14,0.9),rgba(16,18,14,0.34)_55%,rgba(16,18,14,0.68)),linear-gradient(180deg,rgba(16,18,14,0.18),rgba(16,18,14,0.88))]" />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="relative z-10 mx-auto flex min-h-[88svh] w-full max-w-[1180px] flex-col justify-end px-4 pb-12 pt-32 md:pb-16"
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
              Portfólio Rosane
            </p>
            <h1 className="mt-5 max-w-[21rem] font-heading text-[2.55rem] font-medium leading-[0.98] tracking-normal sm:max-w-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Uma curadoria de jardins para imóveis de presença.
            </h1>
            <p className="mt-7 max-w-[21rem] text-lg font-light leading-8 text-white/76 sm:max-w-2xl md:text-xl">
              Projetos residenciais, corporativos e áreas externas criados para elevar a
              experiência do espaço antes mesmo do primeiro contato.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={buildWhatsAppUrl("Olá, quero solicitar um projeto inspirado no portfólio da Rosane Paisagismo.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
              >
                Solicitar projeto
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#galeria"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/34 px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Explorar cases
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
                  Imagens grandes, leitura editorial e foco no desejo.
                </h2>
              </div>
              <p className="text-base leading-8 text-[#5f665c]">
                Cada case revela desafio, solução aplicada, espécies utilizadas e
                oportunidades de transformação para imóveis de alto padrão.
              </p>
            </div>

            <motion.div layout className="grid gap-5 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    layout
                    key={project.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ delay: index * 0.04, duration: 0.55 }}
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
                          className="h-full w-full object-cover opacity-92 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
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
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=88&w=1800"
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
              O próximo case pode ser o seu imóvel.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Envie fotos, planta ou referências. A primeira conversa ajuda a entender
              potencial, prioridades e o investimento adequado.
            </p>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#171914] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d3b473]"
            >
              Solicitar atendimento
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
