import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, MapPin, Ruler, Sparkles } from "lucide-react";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const PROJECTS = [
  {
    title: "Residência Horizonte",
    category: "Residencial premium",
    location: "Condomínio fechado",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=85&w=1500",
    summary: "Piscina, lounge gourmet, jardim tropical contemporâneo e iluminação cênica para uso noturno.",
    stats: { area: "1.400 m²", prazo: "Projeto + implantação", detalhe: "Área gourmet" },
  },
  {
    title: "Cobertura Jardins",
    category: "Jardins suspensos",
    location: "São Paulo, SP",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=85&w=1500",
    summary: "Refúgio urbano com vasos sob medida, espécies esculturais e permanência para receber.",
    stats: { area: "360 m²", prazo: "45 dias", detalhe: "Cobertura" },
  },
  {
    title: "Casa Reserva",
    category: "Residencial premium",
    location: "Lago Sul",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=85&w=1500",
    summary: "Paisagismo de baixa manutenção com camadas verdes, privacidade e presença arquitetônica.",
    stats: { area: "980 m²", prazo: "Execução completa", detalhe: "Privacidade" },
  },
  {
    title: "Clínica Essenza",
    category: "Clínicas e corporativo",
    location: "Montes Claros, MG",
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=85&w=1500",
    summary: "Fachada e recepção biofílica para comunicar acolhimento, sofisticação e confiança.",
    stats: { area: "420 m²", prazo: "Projeto executivo", detalhe: "Biofilia" },
  },
  {
    title: "Pátio Gourmet",
    category: "Piscinas e gourmet",
    location: "Interior de SP",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=85&w=1500",
    summary: "Ambiente integrado com piscina, deck, vegetação aromática e cenas de luz para receber.",
    stats: { area: "720 m²", prazo: "4 meses", detalhe: "Piscina" },
  },
  {
    title: "Jardim Sensorial",
    category: "Clínicas e corporativo",
    location: "Belo Horizonte, MG",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=85&w=1500",
    summary: "Experiência verde para áreas de espera, circulação e descompressão de equipes.",
    stats: { area: "300 m²", prazo: "60 dias", detalhe: "Experiência" },
  },
];

const CATEGORIES = ["Todos", "Residencial premium", "Piscinas e gourmet", "Jardins suspensos", "Clínicas e corporativo"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

export default function Portfolio() {
  const [filter, setFilter] = useState("Todos");
  const filteredProjects = filter === "Todos" ? PROJECTS : PROJECTS.filter((project) => project.category === filter);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#121411]">
      <SEO
        title="Portfólio Premium | Projetos de Paisagismo"
        description="Conheça projetos autorais de paisagismo premium para residências, piscinas, áreas gourmet, clínicas e jardins suspensos."
        keywords="portfólio paisagismo, projetos de paisagismo premium, jardins de luxo, paisagismo residencial, área gourmet com jardim"
        url="https://rosanepaisagismo.com/portfolio"
      />
      <SiteNav activeLink="portfolio" />

      <main>
        <header className="relative flex min-h-[640px] items-end overflow-hidden bg-[#121411] px-5 pb-20 pt-32 text-white md:min-h-[720px] md:pb-28">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=85&w=2200"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-72"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,20,17,0.92),rgba(18,20,17,0.35)_55%,rgba(18,20,17,0.7)),linear-gradient(180deg,rgba(18,20,17,0.2),rgba(18,20,17,0.92))]" />
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 mx-auto w-full max-w-7xl">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#d5bd7b]">Portfólio Rosane</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl lg:text-[5.8rem]">
              Projetos que transformam exteriores em experiências de alto padrão.
            </h1>
            <p className="mt-8 max-w-2xl text-lg font-light leading-8 text-white/76">
              Uma seleção editorial de jardins, piscinas, áreas gourmet, clínicas e espaços residenciais criados para valorizar arquitetura, rotina e patrimônio.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/contato" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#121411] transition hover:-translate-y-0.5 hover:bg-[#b89445] hover:text-white">
                Solicitar projeto exclusivo <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#galeria" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/25 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10">
                Explorar galeria <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </header>

        <section className="border-b border-[#e7e5dc] bg-[#f7f7f3] px-5 py-5 sticky top-[72px] z-30">
          <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`whitespace-nowrap rounded-full px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] transition ${
                  filter === category
                    ? "bg-[#121411] text-white"
                    : "bg-white text-[#697067] hover:bg-[#eceae1] hover:text-[#121411]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section id="galeria" className="bg-[#f7f7f3] px-5 py-20 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#b89445]">Galeria selecionada</p>
                <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
                  Imagens maiores, menos ruído, mais desejo.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-[#626960]">
                Cada case destaca uma intenção: receber melhor, criar privacidade, valorizar a fachada ou transformar permanência em lifestyle.
              </p>
            </div>

            <div className="grid gap-7 md:grid-cols-2">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.7 }}
                  className={`group ${index % 2 === 1 ? "md:translate-y-16" : ""}`}
                >
                  <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_24px_80px_rgba(18,20,17,0.08)]">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#121411] md:aspect-[5/6]">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-88 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/8 to-transparent" />
                      <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-white/12 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                        {project.category}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-7 text-white md:p-9">
                        <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d5bd7b]">
                          <MapPin className="h-3.5 w-3.5" /> {project.location}
                        </p>
                        <h3 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{project.title}</h3>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-white/76">{project.summary}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 p-6 text-[#121411]">
                      <div>
                        <Ruler className="mb-3 h-4 w-4 text-[#b89445]" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9188]">Área</p>
                        <p className="mt-1 text-sm font-semibold">{project.stats.area}</p>
                      </div>
                      <div>
                        <CalendarCheck className="mb-3 h-4 w-4 text-[#b89445]" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9188]">Entrega</p>
                        <p className="mt-1 text-sm font-semibold">{project.stats.prazo}</p>
                      </div>
                      <div>
                        <Sparkles className="mb-3 h-4 w-4 text-[#b89445]" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9188]">Foco</p>
                        <p className="mt-1 text-sm font-semibold">{project.stats.detalhe}</p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#121411] px-5 py-24 text-center text-white md:py-32">
          <div className="mx-auto max-w-4xl">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#d5bd7b]">Próximo projeto</p>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
              O próximo case pode ser o seu imóvel.
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg font-light leading-8 text-white/70">
              Envie fotos, planta ou referências. A equipe avalia o potencial do espaço e propõe o caminho mais elegante para transformar a área externa.
            </p>
            <Link to="/contato" className="mt-10 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#121411] transition hover:-translate-y-0.5 hover:bg-[#b89445] hover:text-white">
              Agendar consultoria <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
