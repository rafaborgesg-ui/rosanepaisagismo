import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const highlights = [
  ["Convivência", "Setores pensados para receber, cozinhar, descansar e circular com conforto."],
  ["Piscina integrada", "Composição vegetal que valoriza bordas, espelhos d'água e áreas de permanência."],
  ["Iluminação cênica", "Jardim bonito também à noite, com atmosfera adequada para eventos e família."],
  ["Manutenção planejada", "Escolha botânica orientada por clima, insolação, limpeza e rotina da casa."],
];

const packages = [
  {
    title: "Revitalização estratégica",
    text: "Para quem já tem área gourmet ou piscina e precisa elevar estética, plantas, iluminação e pontos de uso.",
    range: "Ideal a partir de R$ 18k",
  },
  {
    title: "Projeto completo",
    text: "Para obra, reforma ou casa nova: conceito, setores, vegetação, materiais, fornecedores e implantação.",
    range: "Ideal a partir de R$ 35k",
  },
  {
    title: "Transformação premium",
    text: "Para residências de alto padrão que precisam de jardim, piscina, gourmet, fachada e manutenção integrada.",
    range: "Ideal a partir de R$ 80k",
  },
];

export default function AreaGourmetPiscina() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Paisagismo para Área Gourmet e Piscina"
        description="Projetos de paisagismo premium para áreas gourmet, piscinas, jardins de convivência e espaços externos residenciais."
        keywords="paisagismo área gourmet, paisagismo piscina, jardim para piscina, área externa premium, projeto área gourmet"
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>

      <SiteNav activeLink="gourmet" />

      <main className="font-body">
        <section className="relative min-h-[92vh] overflow-hidden bg-[#173727] pt-28 text-white">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1920"
            alt="Área gourmet com piscina e paisagismo"
            className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/86 to-[#173727]/25" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto grid min-h-[74vh] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8"
          >
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Área Gourmet & Piscina</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">
                O espaço mais desejado da casa precisa ser inesquecível.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">
                Transformamos áreas externas em ambientes de convivência premium e resorts particulares. Vegetação, iluminação e circulação pensadas para você viver o melhor do seu imóvel.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/contato?interesse=Area+Gourmet+e+Piscina" className="rounded-full bg-[#d7ae45] px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-xl hover:bg-white transition-all hover:scale-105">
                  Avaliar minha área externa
                </Link>
                <Link to="/portfolio" className="rounded-full border border-white/30 px-8 py-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-white transition-all hover:border-[#d7ae45] hover:text-[#d7ae45] hover:scale-105">
                  Ver referências premium
                </Link>
              </div>
            </div>
            <aside className="rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#d7ae45]">Diagnóstico Técnico</p>
              <div className="mt-6 space-y-4">
                {["Luminosidade e sombra", "Integração visual arquitetônica", "Relação vegetação x piscina", "Seleção botânica específica"].map((item, index) => (
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
          <div className="mb-16 max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Design Funcional</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl text-[#173727]">
              Beleza arquitetônica atrelada à rotina da casa.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {highlights.map(([title, text], index) => (
              <motion.article 
                key={title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-[32px] border border-stone-100 bg-white p-8 shadow-xl shadow-stone-200/50 hover:-translate-y-2 transition-transform duration-300"
              >
                <h3 className="font-display text-2xl font-bold text-[#173727]">{title}</h3>
                <p className="mt-4 text-sm leading-8 text-stone-500">{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="bg-[#fbfaf6] border-t border-stone-200 px-5 py-32 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Formatos de Projeto</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl text-[#173727]">
                Toda grande transformação precisa de um escopo claro.
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {packages.map((item, index) => (
                <motion.article 
                  key={item.title} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="rounded-[32px] bg-white border border-stone-100 p-10 shadow-2xl shadow-stone-200/50 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-display text-3xl font-bold text-[#173727]">{item.title}</h3>
                    <p className="mt-5 text-sm leading-8 text-stone-500">{item.text}</p>
                  </div>
                  <p className="mt-10 inline-block rounded-full bg-[#173727] px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-[#d7ae45] w-max">{item.range}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#173727] px-5 py-32 text-center text-white md:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Agende Seu Diagnóstico</p>
            <h2 className="mt-6 font-display text-5xl font-bold leading-tight md:text-6xl">
              Pronto para construir o espaço mais desejado da casa?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Com algumas imagens e medidas aproximadas, já conseguimos direcionar o investimento e os próximos passos para a sua transformação.
            </p>
            <Link to="/contato?interesse=Area+Gourmet+e+Piscina" className="mt-12 inline-block rounded-full bg-[#d7ae45] px-10 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-2xl transition-all hover:scale-105 hover:bg-white">
              Agendar Consultoria
            </Link>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
