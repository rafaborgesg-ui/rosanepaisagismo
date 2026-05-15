import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const projects = [
  {
    title: "Residência com área gourmet",
    category: "Residencial",
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1200",
    challenge: "Integrar piscina, área gourmet e jardim sem perder elegância nem funcionalidade.",
    solution: "Setorização de convivência, composição tropical e iluminação cênica para uso noturno.",
    stats: ["450 m²", "Projeto + implantação", "R$ 60k+"],
  },
  {
    title: "Fachada de alto impacto",
    category: "Residencial",
    image: "https://images.unsplash.com/photo-1558904541-efa8c1965f9d?auto=format&fit=crop&q=80&w=1200",
    challenge: "Valorizar a primeira impressão do imóvel e criar um percurso de chegada marcante.",
    solution: "Curadoria de espécies esculturais, volumes verdes e manutenção simplificada.",
    stats: ["Entrada social", "Valorização visual", "R$ 30k+"],
  },
  {
    title: "Clínica de estética premium",
    category: "Clínicas",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1200",
    challenge: "Criar acolhimento e diferenciação de marca logo na chegada do paciente.",
    solution: "Paisagismo biofílico, espécies de baixa manutenção e pontos visuais instagramáveis.",
    stats: ["Recepção externa", "Experiência do paciente", "R$ 25k+"],
  },
  {
    title: "Jardim vertical urbano",
    category: "Jardins verticais",
    image: "https://images.unsplash.com/photo-1598516091216-c3059871bbbb?auto=format&fit=crop&q=80&w=1200",
    challenge: "Trazer presença verde para uma área compacta sem ocupar circulação.",
    solution: "Parede viva com sistema de irrigação, textura botânica e desenho sob medida.",
    stats: ["Espaço compacto", "Irrigação", "R$ 18k+"],
  },
  {
    title: "Casa de campo contemporânea",
    category: "Residencial",
    image: "https://images.unsplash.com/photo-1590011502447-90977f6b9571?auto=format&fit=crop&q=80&w=1200",
    challenge: "Organizar uma área extensa com unidade visual e manutenção viável.",
    solution: "Macromassas vegetais, espécies resistentes e caminhos com leitura arquitetônica.",
    stats: ["1.200 m²", "Etapas de execução", "R$ 120k+"],
  },
  {
    title: "Corporativo com biofilia",
    category: "Corporativo",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    challenge: "Humanizar áreas comuns e reforçar percepção de valor da empresa.",
    solution: "Ambientes verdes de baixa manutenção, pontos de pausa e materiais naturais.",
    stats: ["Áreas comuns", "Bem-estar", "R$ 45k+"],
  },
];

const categories = ["Todos", "Residencial", "Clínicas", "Corporativo", "Jardins verticais"];

export default function Portfolio() {
  const [filter, setFilter] = useState("Todos");
  const filteredProjects = filter === "Todos" ? projects : projects.filter((project) => project.category === filter);

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Portfólio de Paisagismo Premium"
        description="Conheça estudos de projetos de paisagismo residencial, corporativo, clínico e jardins verticais com foco em valorização e experiência."
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <SiteNav activeLink="portfolio" />

      <main className="font-body">
        <section className="bg-[#173727] px-5 pb-32 pt-40 text-white md:px-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#173727]/50 to-[#173727] z-0 pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.8fr] md:items-end relative z-10"
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Galeria Editorial</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">
                Onde a arquitetura encontra o seu estado de arte.
              </h1>
            </div>
            <p className="max-w-xl text-lg leading-8 text-white/70">
              Explore casos reais onde transformamos áreas externas convencionais em resorts particulares. Cada projeto reflete nossa metodologia focada em estética, biofilia e valorização patrimonial.
            </p>
          </motion.div>
        </section>

        <section className="sticky top-0 z-30 border-b border-stone-100 bg-white/80 px-5 py-4 backdrop-blur-xl md:px-8 shadow-sm">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto no-scrollbar pb-2 pt-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`whitespace-nowrap rounded-full px-6 py-3 text-[10px] font-extrabold uppercase tracking-[0.15em] transition-all duration-300 ${
                  filter === category ? "bg-[#173727] text-[#d7ae45] shadow-lg scale-105" : "bg-stone-50 border border-stone-200 text-stone-500 hover:bg-stone-100 hover:text-[#173727]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-32 md:px-8">
          <motion.div layout className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.article 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  key={project.title} 
                  className="group flex flex-col overflow-hidden rounded-[32px] border border-stone-100 bg-white shadow-xl shadow-stone-200/40 hover:shadow-2xl transition-shadow duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#173727]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute left-6 top-6 rounded-full bg-white/95 backdrop-blur px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-sm">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h2 className="font-display text-3xl font-bold text-[#173727] leading-tight">{project.title}</h2>
                    <div className="mt-8 space-y-6 flex-1">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#b28a28]">O Desafio Inicial</p>
                        <p className="mt-2 text-sm leading-7 text-stone-600">{project.challenge}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#b28a28]">Solução Botânica</p>
                        <p className="mt-2 text-sm leading-7 text-stone-600">{project.solution}</p>
                      </div>
                    </div>
                    <div className="mt-8 grid grid-cols-3 gap-3 border-t border-stone-100 pt-6">
                      {project.stats.map((stat) => (
                        <p key={stat} className="rounded-2xl border border-stone-100 bg-[#fbfaf6] p-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#173727] flex items-center justify-center">
                          {stat}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="bg-[#fbfaf6] px-5 py-32 md:px-8 border-t border-stone-200">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto grid max-w-7xl gap-12 rounded-[40px] bg-[#173727] p-10 shadow-2xl md:grid-cols-[1fr_0.7fr] md:p-16 relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#d7ae45]/10 to-transparent pointer-events-none" />
            <div className="relative z-10 text-white">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#d7ae45]">Seu Imóvel Aqui</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
                Pronto para o seu projeto de assinatura?
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-white/70">
                Pare de tratar o seu jardim como sobra da obra. Transforme sua área externa no metro quadrado mais valioso e disputado da casa. O diagnóstico inicial é o primeiro passo para essa mudança.
              </p>
            </div>
            <div className="relative z-10 flex items-center md:justify-end mt-8 md:mt-0">
              <Link to="/contato?interesse=Projeto+Premium+via+Portfolio" className="rounded-full bg-[#d7ae45] px-10 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-xl transition-all hover:scale-105 hover:bg-white hover:text-[#173727]">
                Solicitar Diagnóstico Agora
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
