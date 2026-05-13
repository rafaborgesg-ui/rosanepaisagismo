import { useState } from "react";
import { Link } from "react-router-dom";
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
        <section className="bg-[#173727] px-5 pb-20 pt-36 text-white md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Portfólio estratégico</p>
              <h1 className="mt-5 font-display text-5xl font-bold leading-tight md:text-7xl">
                Projetos que vendem valor antes de vender planta.
              </h1>
            </div>
            <p className="max-w-xl text-lg leading-8 text-white/70">
              A seleção abaixo mostra tipos de transformação que atraem projetos de maior ticket. Substitua gradualmente as imagens por obras reais, fotos de bastidor e antes/depois da Rosane.
            </p>
          </div>
        </section>

        <section className="sticky top-16 z-30 border-b border-stone-200 bg-white/95 px-5 py-4 backdrop-blur md:px-8">
          <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`whitespace-nowrap rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-wider transition ${
                  filter === category ? "bg-[#173727] text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <article key={project.title} className="group overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/92 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#173727]">
                    {project.category}
                  </span>
                </div>
                <div className="p-7">
                  <h2 className="font-display text-3xl font-bold">{project.title}</h2>
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-widest text-[#b28a28]">Desafio</p>
                      <p className="mt-2 text-sm leading-7 text-stone-600">{project.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-widest text-[#b28a28]">Solução</p>
                      <p className="mt-2 text-sm leading-7 text-stone-600">{project.solution}</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-2 border-t border-stone-200 pt-5">
                    {project.stats.map((stat) => (
                      <p key={stat} className="rounded-xl bg-[#fbfaf6] px-3 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-[#173727]">
                        {stat}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#eef3ed] px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-[28px] bg-white p-8 shadow-sm md:grid-cols-[1fr_0.7fr] md:p-12">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Próximo nível</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                Um portfólio profissional precisa provar processo, não apenas beleza.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-stone-600">
                A próxima etapa recomendada é cadastrar casos reais com fotos próprias, depoimentos, vídeos curtos e dados de obra. Isso aumenta confiança e reduz negociação por preço.
              </p>
            </div>
            <div className="flex items-center md:justify-end">
              <Link to="/contato?interesse=Projeto+Premium+via+Portfolio" className="rounded-full bg-[#d7ae45] px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] hover:bg-[#173727] hover:text-white">
                Quero um projeto assim
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
