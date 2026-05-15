import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const pages = {
  "jardim-tropical": {
    title: "Jardim Tropical Moderno",
    eyebrow: "Tropical sofisticado",
    description: "Projetos de jardins tropicais contemporâneos para casas, áreas gourmet, fachadas e espaços de convivência.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1920",
    keywords: "jardim tropical moderno, paisagismo tropical, jardim resort, plantas tropicais para jardim",
    bullets: ["Sensação de resort", "Volumes orgânicos", "Espécies exuberantes", "Manutenção planejada"],
  },
  "jardim-vertical": {
    title: "Jardim Vertical Natural",
    eyebrow: "Verde em espaços compactos",
    description: "Jardins verticais naturais ou preservados para varandas, fachadas, clínicas, áreas gourmet e ambientes corporativos.",
    image: "https://images.unsplash.com/photo-1598516091216-c3059871bbbb?auto=format&fit=crop&q=80&w=1920",
    keywords: "jardim vertical natural, jardim vertical preservado, parede verde, jardim vertical para varanda",
    bullets: ["Parede viva", "Irrigação orientada", "Textura botânica", "Alto impacto visual"],
  },
  "condominios-luxo": {
    title: "Paisagismo para Condomínios de Luxo",
    eyebrow: "Áreas comuns premium",
    description: "Paisagismo para entradas, praças, piscinas, áreas comuns e percursos de condomínios residenciais de alto padrão.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1920",
    keywords: "paisagismo para condomínio, paisagismo condomínio de luxo, jardim para condomínio, áreas comuns premium",
    bullets: ["Entradas marcantes", "Áreas comuns valorizadas", "Implantação por etapas", "Manutenção recorrente"],
  },
  "fachadas-comerciais": {
    title: "Paisagismo para Fachadas Comerciais",
    eyebrow: "Primeira impressão que vende",
    description: "Projetos para fachadas comerciais, lojas, clínicas e escritórios que precisam elevar percepção de marca.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1920",
    keywords: "paisagismo fachada comercial, jardim para loja, fachada de clínica, paisagismo comercial",
    bullets: ["Marca mais memorável", "Entrada acolhedora", "Espécies resistentes", "Baixa manutenção"],
  },
  "paisagismo-corporativo": {
    title: "Paisagismo Corporativo",
    eyebrow: "Biofilia para empresas",
    description: "Paisagismo para empresas, escritórios, recepções e áreas comuns com foco em bem-estar e percepção de valor.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920",
    keywords: "paisagismo corporativo, biofilia empresas, jardim corporativo, paisagismo escritório",
    bullets: ["Ambientes mais humanos", "Bem-estar", "Marca premium", "Planos de manutenção"],
  },
};

export default function NicheLanding({ slug }) {
  const page = pages[slug] || pages["jardim-tropical"];

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO title={page.title} description={page.description} keywords={page.keywords} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav />

      <main className="font-body">
        <section className="relative min-h-[92vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src={page.image} 
            alt={page.title} 
            className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-overlay" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/86 to-[#173727]/22" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto grid min-h-[74vh] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8"
          >
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">{page.eyebrow}</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">{page.title}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">{page.description}</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to={`/contato?interesse=${encodeURIComponent(page.title)}`} className="rounded-full bg-[#d7ae45] px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-xl hover:bg-white transition-all hover:scale-105">
                  Solicitar Projeto Exclusivo
                </Link>
                <Link to="/quiz-paisagismo" className="rounded-full border border-white/30 px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-white transition-all hover:border-[#d7ae45] hover:text-[#d7ae45] hover:scale-105">
                  Fazer quiz rápido
                </Link>
              </div>
            </div>
            <aside className="rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Diferenciais</p>
              <div className="mt-6 space-y-4">
                {page.bullets.map((item, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    key={item} 
                    className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 transition-colors hover:bg-white/20"
                  >
                    <span className="material-symbols-outlined text-[#d7ae45]">check_circle</span>
                    <span className="font-semibold">{item}</span>
                  </motion.div>
                ))}
              </div>
            </aside>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-32 md:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">O Método</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl text-[#173727]">Processo de Criação Premium</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ["Diagnóstico e Lifestyle", "Entendimento profundo do seu espaço, estilo arquitetônico, rotina e expectativa de investimento."],
              ["Conceito e Botânica", "Criação de identidade visual exclusiva, escolha botânica de ponta e pontos de impacto estético."],
              ["Execução e Previsibilidade", "Orientação técnica clara para garantir que a execução seja um reflexo fiel da nossa visão 3D."],
            ].map(([title, text], index) => (
              <motion.article 
                key={title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="rounded-[32px] border border-stone-100 bg-white p-10 shadow-xl shadow-stone-200/50 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-[#173727] text-[#d7ae45] flex items-center justify-center font-display text-2xl font-bold mb-6">{index + 1}</div>
                <h3 className="font-display text-3xl font-bold text-[#173727] leading-tight">{title}</h3>
                <p className="mt-5 text-sm leading-8 text-stone-500">{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="bg-[#173727] px-5 py-32 text-center text-white md:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Inicie Seu Projeto</p>
            <h2 className="mt-6 font-display text-5xl font-bold leading-tight md:text-6xl">
              Vamos materializar a sua visão de um espaço exclusivo?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Solicite uma consultoria inicial. Nossa equipe fará a leitura do seu espaço e apresentará o caminho mais seguro e elegante para a transformação.
            </p>
            <Link to={`/contato?interesse=${encodeURIComponent(page.title)}`} className="mt-12 inline-block rounded-full bg-[#d7ae45] px-10 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-2xl transition-all hover:scale-105 hover:bg-white">
              Solicitar Consultoria Agora
            </Link>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
