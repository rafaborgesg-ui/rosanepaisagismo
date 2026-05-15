import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";

const pillars = [
  ["Arquitetura de exteriores", "O jardim é pensado como parte da arquitetura, não como decoração final."],
  ["Curadoria botânica", "Escolha de espécies com intenção estética, técnica, climática e de manutenção."],
  ["Experiência premium", "Atendimento orientado por briefing, clareza de escopo e resultado visual."],
  ["Preservação do investimento", "Implantação e manutenção conectadas para o jardim continuar bonito."],
];

export default function SobreEscritorio() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#173727] overflow-x-hidden">
      <SEO
        title="Sobre o Escritório"
        description="Conheça a Rosane Paisagismo, escritório boutique de paisagismo premium para residências, clínicas, áreas gourmet, fachadas e manutenção."
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <SiteNav />

      <main className="font-body">
        <section className="grid min-h-[92vh] bg-[#173727] pt-28 text-white md:grid-cols-[1.1fr_0.9fr] relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center px-5 py-16 md:px-16 lg:px-24 z-10"
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">Ateliê de Arquitetura Externa</p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">
                Paisagismo como assinatura de patrimônio e exclusividade.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">
                A Rosane Paisagismo é um escritório focado no design de áreas externas de alto padrão. Unimos arquitetura, biofilia e comportamento humano para entregar resorts particulares absolutos.
              </p>
              <Link to="/contato?interesse=Conhecer+o+Escritorio" className="mt-10 inline-block rounded-full bg-[#d7ae45] px-10 py-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-xl transition-all hover:scale-105 hover:bg-white">
                Agendar Reunião de Projeto
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-[520px] lg:min-h-full"
          >
            <img src="https://media.base44.com/images/public/69ea9c43ca6eb4180010c463/9825cfba9_IMG_7921jpg.jpg" alt="Rosane Borges" className="absolute inset-0 h-full w-full object-cover grayscale-[30%] mix-blend-luminosity opacity-80 transition-all duration-1000 hover:grayscale-0 hover:mix-blend-normal hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/40 to-transparent pointer-events-none" />
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-32 md:px-8">
          <div className="mb-16 max-w-3xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#b28a28]">Nossa Metodologia</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl text-[#173727]">
              O design que diferencia propriedades comuns de propriedades icônicas.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {pillars.map(([title, text], index) => (
              <motion.article 
                key={title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-[32px] border border-stone-100 bg-white p-8 shadow-xl shadow-stone-200/50 hover:-translate-y-2 transition-transform duration-300 flex flex-col"
              >
                <div className="h-10 w-10 mb-6 rounded-full border border-[#d7ae45]/30 flex items-center justify-center text-[#d7ae45] font-display font-bold">
                  {index + 1}
                </div>
                <h3 className="font-display text-2xl font-bold text-[#173727]">{title}</h3>
                <p className="mt-4 text-sm leading-8 text-stone-500">{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="bg-[#173727] px-5 py-32 text-center text-white md:px-8 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl relative z-10"
          >
            <p className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#d7ae45]">O Próximo Passo</p>
            <h2 className="mt-6 font-display text-5xl font-bold leading-tight md:text-6xl">
              Vamos discutir a arquitetura da sua área externa.
            </h2>
            <Link to="/contato?interesse=Reuniao+de+Alinhamento" className="mt-12 inline-block rounded-full bg-[#d7ae45] px-12 py-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#173727] shadow-2xl transition-all hover:scale-105 hover:bg-white">
              Agendar Reunião
            </Link>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
